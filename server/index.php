<?php 

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
		
		

$app->get('/hello/{name}', function (Request $request, Response $response) {
	$name = $request->getAttribute('name');
	$response->getBody()->write("Hello, $name");
	
	return $response;
});


$app->post('/player/search/', function (Request $request, Response $response) {

	$body = json_decode($request->getBody());
	$name = $body->playerName;
	
	if(!empty($name)){
		$pObj = new Player($GLOBALS['db']);
		$tObj = new Tournament($GLOBALS['db']);
		
		$players = $pObj->searchForPlayer($name);
		
		foreach($players as $player){
			$player->nemeses = $player->getPlayerNemeses();
			$player->rivals = $player->getPlayerRivals();
			$player->tournaments = $tObj->getPlayerTournaments($player);
			foreach($player->tournaments as $tournament){
				$tournament->entry = $tournament->roster->findPlayerInRoster($player);
			}
		}
		
		return return_json($players);
	}
		
});

$app->get('/player/{playerID}', function (Request $request, Response $response) {
		
	$id = $request->getAttribute('playerID');
	$player= new Player($GLOBALS['db'], $id);
	$tObj = new Tournament($GLOBALS['db']);
	
	$player->nemeses = $player->getPlayerNemeses();
	$player->rivals = $player->getPlayerRivals();
	
	$player->tournaments = $tObj->getPlayerTournaments($player);
	foreach($player->tournaments as $key => $tournament){
		$tournament->entry = $tournament->roster->findPlayerInRoster($player);
	}
	
	return return_json($player);
	
});



function return_json($data){
	header("Content-Type: application/json");
	echo json_encode(array('data'=>$data),JSON_NUMERIC_CHECK);
	exit();
}

$app->run();

?>