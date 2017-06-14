<?php 
ini_set('display_errors', 1);
error_reporting(E_ALL);

set_time_limit(0);
ignore_user_abort(true);

mb_internal_encoding("UTF-8"); 

require_once 'lib/classes/expansion.class.php';
require_once 'lib/classes/player.class.php';
require_once 'lib/classes/tournament.class.php';
require_once 'lib/classes/tournamentRoster.class.php';
require_once 'lib/classes/tournamentPlayer.class.php';
require_once 'lib/classes/tournamentRounds.class.php';
require_once 'lib/classes/tournamentRound.class.php';

$db = mysqli_connect('localhost', 'root', 'brad347', 'isleofravens');

//$tapi = new TournamentAPI($db);

//API Call to get all tournaments
$tournaments = json_decode(file_get_contents("http://thejoustingpavilion.com/api/v2/json/tournaments"));

//loop over all tournaments to games
foreach($tournaments as $tournament){
	
	$Tourney = new Tournament($db, null, $tournament->tournament_id);
	
	if(!$Tourney->tournament_id){
		
		//check for the expansion
		$Expan = new Expansion($db, null, $tournament->expansion);
		
		if(!$Expan->expansion_id){
			$Expan->save();
		}

		//set our tournament details
		$Tourney->setValue('jp_tournament_id', $tournament->tournament_id);
		$Tourney->setValue('country', $tournament->country);
		$Tourney->setValue('region', $tournament->region);
		$Tourney->setValue('name', $tournament->tournament_name);
		$Tourney->setValue('expansion_id', $Expan->expansion_id);
		$Tourney->setValue('date_end', $tournament->end_time);
		$Tourney->setValue('date_end', $tournament->end_time);
		$Tourney->setValue('player_count', $tournament->player_count);
		$Tourney->setValue('game_id', 1);
		
		//save our tournament
		$Tourney->save();
	}
	
	//now lets get the roster for this tournament
	$roster = json_decode(file_get_contents("http://thejoustingpavilion.com/api/v2/json/tournaments/".$tournament->tournament_id));
	
	$Tourney->getRoster();
	
	foreach($roster as $entry){
		
		$Player = new Player($db, null, null);
		$Player->setPlayerByJPID($entry->player_id);
		
		//check to see if these player exists
		if(!$Player->player_id){
			
			//set our player details
			$Player->setValue('jp_player_id', $entry->player_id);
			$Player->setValue('name', $entry->player_name);
			$Player->setValue('elo', 1400);
			$Player->setValue('date_created', $Tourney->date_end);
			$Player->save();
		}

		if(!$Tourney->roster->playerInRoster($Player)){
			$Tourney->roster->addPlayerToRoster($Player, $entry->faction, $entry->agenda, $entry->topx,$entry->points,$entry->sos,$entry->esos, $Player->elo);
		}
	}
	
	$Tourney->saveAvgElo();
	
	//now that the roster is built, we will get all the games
	$games = json_decode(file_get_contents("http://thejoustingpavilion.com/api/v2/json/games?tournament_id=".$tournament->tournament_id));
	
	$Tourney->getRounds();
	
	foreach($games as $game){
		
		//get our roster entries for each player
		$e_player_1 = $Tourney->roster->findPlayerInRosterByJPID($game->p1_id);
		$e_player_2 = $Tourney->roster->findPlayerInRosterByJPID($game->p2_id);
		
		//in some cases like a bye, our player will not be in the roster
		//so we need to check or that, and fetch with the main player object in that case.
		if(!is_object($e_player_1)){
			$e_player_1 = new stdClass();
			$e_player_1->player = new Player($db);
			$e_player_1->player->setPlayerByJPID($game->p1_id);
		}
		if(!is_object($e_player_2)){
			$e_player_2= new stdClass();
			$e_player_2->player = new Player($db);
			$e_player_2->player->setPlayerByJPID($game->p1_id);
		}
		
		
		//do we have a record for this player in this round?
		if(!$Tourney->rounds->playerHasRound($game->tournament_round, $e_player_1->player)){
			$Tourney->rounds->addRound($game->tournament_round,$e_player_1->player,$e_player_2->player, $game->topx, $game->game_id);
		}
		
		if(!$Tourney->rounds->isRoundFinished($game->tournament_round, $e_player_1->player)){
			//we have a round, do we have a winner?
			$Tourney->rounds->addRoundResult($game->tournament_round, $e_player_1->player, $game->p1_points, $e_player_2->player, $game->p2_points);
		}
		
	}
	
	$Tourney->saveEndingElo();
	
}
	
	/*
	
	//this is the first method of doing all this before rebuilding all of our classes
	//to be full object-orianted.
	
	//check to see if tournament already in database
	$tourney = $tapi->getTournamentByJPID($tournament->tournament_id);
	
	//if it's not, add it
	if(empty($tourney)){
		$tournament_id = $tapi->addtournament($tournament);
		
		if(!$tournament_id){
			echo "Error Adding tournament!!!<br/>";
			exit();
		}
	}else{
		$tournament_id = $tourney['id'];
	}

	//now lets get the roster for this tournament
	$roster = json_decode(file_get_contents("http://thejoustingpavilion.com/api/v2/json/tournaments/".$tournament->tournament_id));
	

	
	$i = 0;
	foreach($roster as $entry){
		
		$i++; //our source data is ordered by place, so we track that when adding to the roster
		
		//check to see if this player exists
		$Player = new Player($db, null, $entry->player_name);

		//if we didn't find the player, set some more details then save them
		if(!$Player->player_id){
			$Player->jp_player_id = $entry->player_id;
			$Player->date_created = $tournament->end_time;
			$Player->save();
		}
		
		$Roster = new TournamentRoster($db);
		
		//if the player isn't in our roster, we will set the details and save them
		if(!$Roster->playerInRoster($tournament_id, $Player->player_id)){
			
			$data['roster_id'];
			$data['tournament_id'] = $tournament_id;
			$data['player_id'] = $Player->player_id;
			$data['faction'] = $entry->faction;
			$data['agenda'] = $entry->agenda;
			$data['place'] = $i;
			$data['points'] = 0;
			$data['sos'] = $entry->sos;
			$data['esos'] = $entry->esos;
			
			if($entry->topx < 257){
				$data['top_cut'] = $entry->topx;
			}
			
			$data['sos'] = $entry->sos;
			$data['esos'] = $entry->esos;
			
			$Roster->setRoster($data);
			$Roster->save();
			
			//record this players new entry
			$Player->entries++;
			$Player->save();
			
		}
	}
	
	$games = json_decode(file_get_contents("http://thejoustingpavilion.com/api/v2/json/games?tournament_id=".$tournament->tournament_id));
	
	//loop over all games, store in database
	foreach($games as $game){
		
		$round = new TournamentRound($db);
		
		
		//if these players have not played this round, save it to the database.
		//determine the winner
		if($game->p1_points > $game->p2_points){
			$winner = 'p1';
			$loser = 'p2';
		}elseif($game->p1_points < $game->p2_points){
			$winner = 'p2';
			$loser = 'p1';
		}else{
			echo "couldn't determine winner???<br/>";
			echo "<pre>";
			print_r($game);
			echo "</pre>";
			continue;
		}
		
		$wp = new Player($db, null, $game->{$winner."_name"});
		$lp = new Player($db, null, $game->{$loser."_name"});
		
		
		if(!$round->isRoundRecorded($wp->player_id, $lp->player_id, $game->tournament_round,$tournament_id)){
		
			$data['round_id'] = '';
			$data['jp_game_id'] = $game->game_id;
			$data['tournament_id'] = $tournament_id;
			$data['round_number'] = $game->tournament_round;
			$data['winner_id'] = $wp->player_id;
			$data['winner_points'] = $game->{$winner."_points"};
			$data['loser_id'] = $lp->player_id;
			$data['loser_points'] = $game->{$loser."_points"};
			$data['top_cut'] = $game->topx;
			
			$round->setRound($data);
			
			
			
			$round->save();
			
			$PAPI = new PlayerAPI();
			//record win/loss for players
			$PAPI->calculateELO($wp, $lp);
			$wp->wins++;
			$lp->losses++;
			
			$wp->save();
			$lp->save();
			
		}
		$GLOBALS['debug'] = 0;
		
		
	}
	*/




?>