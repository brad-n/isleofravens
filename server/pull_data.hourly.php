<?php 
ini_set('display_errors', 1);
error_reporting(E_ALL);

date_default_timezone_set('America/Los_Angeles');

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

$date = date('Y-m-d',strtotime('now -1 day'));

//API Call to get all tournaments
$tournaments = json_decode(file_get_contents("http://thejoustingpavilion.com/api/v2/json/tournaments?after=".$date));

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
			
			$GLOBALS['current']['entry'] = $entry;
			
			/*
			 * We don't need to this really it just throws a warning, but we're trying to narrow in on some other bugs
			 * so we're just doing to house keeping.
			 */
			if(!isset($entry->topx)){
				$entry->topx = 0;
			}
			if(!isset($entry->points)){
				$entry->points = 0;
			}
			if(!isset($entry->sos)){
				$entry->sos = 0;
			}
			if(!isset($entry->esos)){
				$entry->esos = 0;
			}
			if(!isset($entry->faction)){
				$entry->faction = '';
			}
			if(!isset($entry->agenda)){
				$entry->agenda = '';
			}
			
			$Tourney->roster->addPlayerToRoster($Player, $entry->faction, $entry->agenda, $entry->topx,$entry->points,$entry->sos,$entry->esos, $Player->elo);
			
		}
	}
	
	$Tourney->saveAvgElo();
	
	//now that the roster is built, we will get all the games
	$games = json_decode(file_get_contents("http://thejoustingpavilion.com/api/v2/json/games?tournament_id=".$tournament->tournament_id));
	
	$Tourney->getRounds();
	
	//sometimes a tournament will not have rounds (imported from Tome or something)
	//so we check for that before trying to calculate ELO
	if(!empty($games)){
		foreach($games as $game){
			
			//get our roster entries for each player
			$e_player_1 = $Tourney->roster->findPlayerInRosterByJPID($game->p1_id);
			$e_player_2 = $Tourney->roster->findPlayerInRosterByJPID($game->p2_id);
			
			
			
			//in some cases like a bye, our player will not be in the roster
			//so we need to check for that, and fetch with the main player object in that case.
			if(!is_object($e_player_1)){
				$e_player_1 = new TournamentPlayer($db, null, new Player($db));
				$e_player_1->player = new Player($db);
				$e_player_1->player->setPlayerByJPID($game->p1_id);
			}
			if(!is_object($e_player_2)){
				$e_player_2 = new TournamentPlayer($db, null, new Player($db));
				$e_player_2->player = new Player($db);
				$e_player_2->player->setPlayerByJPID($game->p2_id);
			}
			
			
			//do we have a record for this player in this round?
			if(!$Tourney->rounds->playerHasRound($game->tournament_round, $e_player_1->player)){
				$Tourney->rounds->addRound($game->tournament_round,$e_player_1->player,$e_player_2->player, $game->topx, $game->game_id);
			}
			
			if(!$Tourney->rounds->isRoundFinished($game->tournament_round, $e_player_1->player)){
				//we have a round, do we have a winner?
				$Tourney->rounds->addRoundResult($game->tournament_round, $e_player_1->player, $game->p1_points, $e_player_2->player, $game->p2_points, $game);
				
				if($game->p1_points > $game->p2_points){
					$e_player_1->addPlayerWin($e_player_1->player);
					$e_player_2->addPlayerLoss($e_player_2->player);
				}elseif($game->p1_points< $game->p2_points){
					$e_player_1->addPlayerLoss($e_player_1->player);
					$e_player_2->addPlayerWin($e_player_2->player);
				}
			}
			
			
		}
		
		$Tourney->saveEndingElo();
	}
	
}

?>