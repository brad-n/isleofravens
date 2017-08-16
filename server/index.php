<?php 
mb_internal_encoding("UTF-8");

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'vendor/autoload.php';

require_once 'config.inc.php';
require_once 'lib/classes/expansion.class.php';
require_once 'lib/classes/player.class.php';
require_once 'lib/classes/tournament.class.php';
require_once 'lib/classes/tournamentRoster.class.php';
require_once 'lib/classes/tournamentPlayer.class.php';
require_once 'lib/classes/tournamentRounds.class.php';
require_once 'lib/classes/tournamentRound.class.php';


use Mailgun\Mailgun;

$app = new \Slim\App;
$GLOBALS['db'] = mysqli_connect('localhost', $cfg['db_user'], $cfg['db_pass'], 'isleofravens');

$app->options('/{routes:.+}', function ($request, $response, $args) {
	return $response;
});
	
$app->add(function ($req, $res, $next) {
	$response = $next($req, $res);
	return $response
		->withHeader('Access-Control-Allow-Origin', 'https://app.isleofravens.com')
		->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
		->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});
		

$app->get('/factions/', function (Request $request, Response $response) {
	
	
	$obj = new Base();
	$obj->setDB($GLOBALS['db']);
	
	$res['factions'] = $obj->getAll("SELECT faction FROM tournament_roster GROUP BY faction HAVING faction != '' ORDER BY faction");
	$res['agendas'] = $obj->getAll("SELECT agenda FROM tournament_roster GROUP BY agenda HAVING agenda != '' ORDER BY agenda");
	
	return return_json($res);
	
});

/*
$app->get('/agendas/', function (Request $request, Response $response) {
	$q = "SELECT agenda FROM tournament_roster GROUP BY agenda HAVING agenda != '' ORDER BY agenda";
});
*/
		
$app->post('/player/search/', function (Request $request, Response $response) {

	$body = json_decode($request->getBody());
	$name = $body->playerName;
	
	if(!empty($name)){
		$pObj = new Player($GLOBALS['db']);
		$tObj = new Tournament($GLOBALS['db']);
		
		$players = $pObj->searchForPlayer($name);
		
		if(is_array($players)){
			foreach($players as $player){
				$player->nemeses = $player->getPlayerNemeses();
				$player->rivals = $player->getPlayerRivals();
			}
		}else{
			return return_json(array('msg'=>'No players matching search!'));
		}
		
		return return_json($players);
	}else{
		return return_json(array('msg'=>'No search string provided!'));
	}
		
});

/*
 * Tournament Specific routes
 */
$app->get('/tournament/rounds/{tournamentID}[/{playerID}]', function (Request $request, Response $response) {
	
	$tid = $request->getAttribute('tournamentID');
	$pid = $request->getAttribute('playerID');

	if($pid){
		$tObj = new Tournament($GLOBALS['db']);
		$result = $tObj->getPlayerRounds($tid, $pid);
	}else{
		$result = new Tournament($GLOBALS['db'], $tid);
	}
	
	
	return return_json($result);
	
});
	
	//tournament/rounds/'+tournament_id+'/'+player_id

/*
 * Player Specific routes
 */
$app->get('/player/{playerID}', function (Request $request, Response $response) {
		
	$id = $request->getAttribute('playerID');
	$player= new Player($GLOBALS['db'], $id);
	
	$player->nemeses = $player->getPlayerNemeses();
	$player->rivals = $player->getPlayerRivals();
	
	return return_json($player);
	
});

$app->get('/player/top/', function (Request $request, Response $response) {
	
	$opts = $request->getQueryParams();
	$player = new Player($GLOBALS['db'], $id);
	$players = $player->getAllPlayers($opts);
	
	return return_json($players);
	
});

$app->get('/player/tournaments/{player_id}', function (Request $request, Response $response) {
		
	$id = $request->getAttribute('player_id');
	$player = new Player($GLOBALS['db'], $id);

	$tObj = new Tournament($GLOBALS['db']);
	$tournaments = $tObj->getPlayerTournaments($player);
	return return_json($tournaments);
		
});


$app->get('/player/faction/winloss/{player_id}', function (Request $request, Response $response) {
	
	$player_id = $request->getAttribute('player_id');
	$obj = new Base();
	$obj->setDB($GLOBALS['db']);
	
	$res = $obj->getAll("SELECT faction, count(round_id) as entries, SUM(CASE WHEN winner_id = ".$obj->__sanitize($player_id)." THEN 1 ELSE 0 END) as wins, SUM(CASE WHEN loser_id = ".$obj->__sanitize($player_id)." THEN 1 ELSE 0 END) as losses from tournament_roster
					INNER JOIN tournament_rounds as tr ON tr.tournament_id = tournament_roster.tournament_id AND (tr.winner_id = ".$obj->__sanitize($player_id)." OR tr.loser_id = ".$obj->__sanitize($player_id).")
					WHERE player_id = ".$obj->__sanitize($player_id)." AND faction != ''
					GROUP BY faction
					ORDER BY faction");
	
	$res2 = $obj->getAll("SELECT faction, agenda, count(round_id) as entries, SUM(CASE WHEN winner_id = ".$obj->__sanitize($player_id)." THEN 1 ELSE 0 END) as wins, SUM(CASE WHEN loser_id = ".$obj->__sanitize($player_id)." THEN 1 ELSE 0 END) as losses from tournament_roster
					INNER JOIN tournament_rounds as tr ON tr.tournament_id = tournament_roster.tournament_id AND (tr.winner_id = ".$obj->__sanitize($player_id)." OR tr.loser_id = ".$obj->__sanitize($player_id).")
					WHERE player_id = ".$obj->__sanitize($player_id)." AND faction != ''
					GROUP BY faction, agenda
					ORDER BY faction");
	
	return return_json(array('faction_win_loss' => $res, 'faction_agenda_win' => $res2));
	
});


$app->get('/stats/factions/entries/', function (Request $request, Response $response) {
	
	$year = date('Y', strtotime('now'));
	
	$obj = new Base();
	$obj->setDB($GLOBALS['db']);
	
	$res = $obj->getAll("select faction, count(faction) as entries, CONCAT(MONTH(date_end), '/',YEAR(date_end)) as date_stamp, CONCAT(YEAR(date_end), '-', MONTH(date_end), '-', '01') as mdate from tournaments as t
					INNER JOIN tournament_roster as tr ON t.tournament_id = tr.tournament_id
					WHERE date_end BETWEEN '2017-01-01 00:00:00' AND '2017-12-31 23:59:59'
					GROUP BY faction, YEAR(date_end), MONTH(date_end)
					HAVING faction != ''
					ORDER BY mdate asc, entries desc");
	
	return return_json($res);
	
	
});

$app->get('/stats/factions/wins/', function (Request $request, Response $response) {
	
	$year = date('Y', strtotime('now'));
	
	$obj = new Base();
	$obj->setDB($GLOBALS['db']);
	
	$res = $obj->getAll("select faction, SUM(wins) as wins, CONCAT(MONTH(date_end), '/',YEAR(date_end)) as date_stamp, CONCAT(YEAR(date_end), '-', MONTH(date_end), '-', '01') as mdate from tournaments as t
				INNER JOIN tournament_roster as tr ON t.tournament_id = tr.tournament_id
				WHERE date_end BETWEEN '2017-01-01 00:00:00' AND '2017-12-31 23:59:59'
				GROUP BY faction, YEAR(date_end), MONTH(date_end)
				HAVING faction != ''
				ORDER BY mdate asc, wins desc");
	
	return return_json($res);
	
	
});


$app->post('/stats/faction/matchups/', function(Request $request, Response $response){
	
	$body = json_decode($request->getBody());
	
	$obj = new Base();
	$obj->setDB($GLOBALS['db']);
	
	
	if($body){
		$faction = $obj->__sanitize($body->faction);
		$agenda = $obj->__sanitize($body->agenda);
		$date = $obj->__sanitize($body->date);
	}
	
	if(empty($faction)){
		$faction = 'Targaryen';
	}
	if(empty($agenda)){
		$agenda = 'Fealty';
	}
	
	if(empty($date)){
		$date = date('Y-m', strtotime('now'))."-01";
	}
	
	
	
	$return['faction'] = $faction;
	$return['agenda'] = $agenda;
	$return['date'] = $date;
	
	$q = "SELECT
				(CASE WHEN winner_faction = '".$faction."' AND winner_agenda = '".$agenda."' THEN loser_faction ELSE winner_faction END) as opponent_faction,
				(CASE WHEN winner_faction = '".$faction."' AND winner_agenda = '".$agenda."' THEN loser_agenda ELSE winner_agenda END) as opponent_agenda,
				COUNT(round_id) as matches,
				SUM((CASE WHEN ((winner_faction = '".$faction."' AND winner_agenda = '".$agenda."')) THEN 1 ELSE 0 END)) as wins,
				SUM((CASE WHEN (loser_faction = '".$faction."' AND loser_agenda = '".$agenda."') THEN 1 ELSE 0 END)) as losses
			FROM tournament_rounds as TR
			INNER JOIN tournaments as T ON T.tournament_id = TR.tournament_id
			WHERE ((winner_faction = '".$faction."' AND winner_agenda = '".$agenda."') OR (loser_faction = '".$faction."' AND loser_agenda = '".$agenda."')) AND T.date_end >= '".$date." 00:00:00'
			GROUP BY opponent_faction, opponent_agenda
			HAVING opponent_faction != '' AND opponent_agenda != ''";
	
	$return['results'] = $obj->getAll($q);
	
	return return_json($return);
	
	
});


$app->post('/stats/faction/matchup_details/', function(Request $request, Response $response){
	
	$body = json_decode($request->getBody());
	
	$obj = new Base();
	$obj->setDB($GLOBALS['db']);
	
	
	if($body){
		$faction = $obj->__sanitize($body->faction);
		$agenda = $obj->__sanitize($body->agenda);
		$faction_2 = $obj->__sanitize($body->faction_2);
		$agenda_2 = $obj->__sanitize($body->agenda_2);
		$date = $obj->__sanitize($body->date);
	}

	if(empty($faction) || empty($faction_2)){
		return return_json(array('error'=>1, 'message'=>'No Factions provided!'));
	}
	
	if(empty($date)){
		$date = date('Y-m', strtotime('now'))."-01";
	}
	
	$q = "select TR.*, P1.name as player_1, P2.name as player_2, P1.elo as player_1_elo, P2.elo as player_2_elo FROM tournament_rounds as TR
			INNER JOIN tournaments as T ON T.tournament_id = TR.tournament_id
			INNER JOIN players as P1 ON P1.player_id = player_1_id
			INNER JOIN players as P2 ON P2.player_id = player_2_id
			WHERE 
			(((winner_faction = '".$faction."' AND winner_agenda = '".$agenda."') AND (loser_faction = '".$faction_2."' AND loser_agenda = '".$agenda_2."'))
			OR
			((loser_faction = '".$faction."' AND loser_agenda = '".$agenda."') AND (winner_faction = '".$faction_2."' AND winner_agenda = '".$agenda_2."')))
			AND date_end >= '".$date."'";
	
	$return = $obj->getAll($q);
	
	return return_json($return);
	
	
});
	

/**
 * General Routes
 */

$app->post('/send-mail/', function(Request $request, Response $response){
	
	$body = json_decode($request->getBody());
	
	$from = $body->name;
	$email = $body->email;
	$message = $body->message;
	
	if(!empty($email) && !empty($message)){
		$mg = Mailgun::create('key-6dca8801f66b2b013c0da637b387dec5');
		$mg->messages()->send('mg.isleofravens.com', [
				'from'    => $from." <".$email.">",
				'to'      => 'digitalgenesis@gmail.com',
				'cc'	  => 'alex@apantoja.com',
				'subject' => 'IoR Contact Sumbission',
				'text'    => $message
		]);
		
		return return_json(array('result'=>1));
	}else{
		return return_json(array('result'=>0));
	}
	
});


function return_json($data){
	header("Content-Type: application/json");
	echo json_encode(array('data'=>$data),JSON_NUMERIC_CHECK);
	exit();
}

$app->run();

?>