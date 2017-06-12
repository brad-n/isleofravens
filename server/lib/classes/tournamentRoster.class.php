<?php 

require_once('lib/classes/base.class.php');

class TournamentRoster extends Base {
	
	public $tournament_id;
	
	/**
	 * @var TournamentPlayer[]
	 */
	public $tournament_players;
	
	function __construct(&$db, $tournament_id = null){
		
		$this->setDB($db);
		$this->tournament_players = array();
		$this->setValue('tournament_players', Array());
		$this->setValue('tournament_id', $tournament_id);
		
		if($this->tournament_id){
			$roster = $this->getAll("SELECT * FROM tournament_roster WHERE tournament_id = '".$this->tournament_id."'");
			
			foreach($roster as $entry){
				array_push($this->tournament_players, new TournamentPlayer($this->db, $this->tournament_id, new Player($db, $entry['player_id'])));
			}
			
			//now inject our BYE (maybe SUPERBYE?)
			array_push($this->tournament_players, new TournamentPlayer($this->db, $this->tournament_id, new Player($db, -1)));
			
		}
		
	}
	
	public function searchRosterByPlayer(Player &$player){
		
		$result = $this->getAll("SELECT * FROM tournament_roster WHERE player_id = '".$player->player_id."'");
		
		if($result){
			foreach($result as $entry){
				$return[] = new TournamentRoster($this->db, $entry['tournament_id']);
				
				
			}
			return $return;
			
		}
		
	}
	
	
	
	public function playerInRoster(Player &$player){
		
		if(is_array($this->tournament_players)){
			foreach($this->tournament_players as $p){
				/* @var $p TournamentPlayer */
				if($p->player_id == $player->player_id){
					return true;
				}
			}
		}
		return false;
	}
	
	public function findPlayerInRoster(Player &$player){
		if(is_array($this->tournament_players)){
			foreach($this->tournament_players as $p){
				/* @var $p TournamentPlayer */
				if($p->player_id == $player->player_id){
					return $p;
				}
			}
		}
		return false;
		
	}
	
	public function findPlayerInRosterByJPID($jp_player_id){
		if(is_array($this->tournament_players)){
			foreach($this->tournament_players as $p){
				/* @var $p TournamentPlayer */
				if($p->player->jp_player_id == $jp_player_id){
					return $p;
				}
			}
		}
		return false;
	
	}
	
	public function addPlayerToRoster(Player &$player, $faction='', $agenda='', $place='', $points=0, $sos=0, $esos=0, $start_elo=0, $end_elo=0){
		
		$tp = new TournamentPlayer($this->db, $this->tournament_id, $player);

		//set all our tournament player variables
		$tp->setValue('faction', $faction);
		$tp->setValue('agenda', $agenda);
		$tp->setValue('place', $place);
		$tp->setValue('points', $points);
		$tp->setValue('sos', $sos);
		$tp->setValue('esos', $esos);
		$tp->setValue('start_elo', $start_elo);
		$tp->setValue('end_elo', $end_elo);
		
		//save them to the roster
		$tp->save();
		
		//push the saved record into our roster collection
		array_push($this->tournament_players, $tp);
		
	}
	
	
}

?>