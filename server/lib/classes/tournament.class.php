<?php 

require_once('lib/classes/base.class.php');

class Tournament extends Base {
	
	public $tournament_id;
	public $jp_tournament_id;
	public $country;
	public $region;
	public $name;
	public $expansion_id;
	public $date_end;
	public $player_count;
	public $game_id;
	public $avg_elo;

	/**
	 * @var TournamentRoster
	 */
	public $roster;
	
	/**
	 * @var TournamentRounds
	 */
	public $rounds;

	
	function __construct(&$db, $tournament_id=null, $jp_tournament_id=null){
		
		$this->setDB($db);
		$this->table = 'tournaments';
		$this->setID('tournament_id');
		$this->setFields(array('tournament_id', 'jp_tournament_id', 'country', 'region', 'name', 'expansion_id', 'date_end', 'player_count', 'avg_elo', 'game_id'));
		
		if($tournament_id){
			$data = $this->getTournamentByID($tournament_id);
			if(is_array($data)){
				$this->setData($data);
			}
		}elseif($jp_tournament_id){
			$data = $this->getTournamentByJPID($jp_tournament_id);
			if(is_array($data)){
				$this->setData($data);
			}
		}
		
	}
	
	public function getTournamentByID($id){
		$sql = "SELECT * FROM `".$this->table."` WHERE tournament_id = '".$id."'";
		return $this->get($sql);
	}
	
	public function getTournamentByJPID($id){
		$sql = "SELECT * FROM `".$this->table."` WHERE jp_tournament_id = '".$id."'";
		return $this->get($sql);
	}

	public function isPlayerInRoster(Player &$player){
		if(!isset($this->roster)){
			$this->getRoster();
		}
		
		return $this->roster->hasPlayer($player);
		
	}
	
	public function getRoster(){
		$this->roster = new TournamentRoster($this->db, $this->tournament_id);
	}
	
	public function getAvgElo(){
		$avg_elo = 0;
		$count = 0;
		foreach($this->roster->tournament_players as $entry){
			//don't include BYEs when calculating avg elo
			if($entry->player_id > 0){
				$count++;
				$avg_elo += $entry->start_elo;
			}
			
		}
		return $avg_elo / $count;
	}
	
	public function getPlayerTournaments(Player $player){
		
		$rObj = new TournamentRoster($this->db);
		$rosters = $rObj->searchRosterByPlayer($player);
		if(is_array($rosters)){
			foreach($rosters as $roster){
				$t = new Tournament($this->db, $roster->tournament_id);
				$t->setValue('roster', $roster);
				$t->getRounds();
				$return[] = $t;
			}
			
			return $return;
		}
		
	}
	
	public function saveAvgElo(){
		$this->avg_elo = $this->getAvgElo();
		$this->save();
		
	}
	
	public function getRounds(){
		$this->rounds = new TournamentRounds($this->db, $this->tournament_id);
		$this->rounds->getRounds();
	}
	
	
	public function saveEndingElo(){
		
		foreach($this->roster->tournament_players as $entry){
			if($entry->player_id){
				
				foreach($this->rounds->tournament_rounds as $round){
					foreach($round as $match){
						if($match->player_1_id == $entry->player_id){
							$player_end_elo = $match->player_1_end_elo;
						}
						if($match->player_2_id == $entry->player_id){
							$player_end_elo = $match->player_2_end_elo;
						}
					}
				}
				
				$entry->end_elo = $player_end_elo;
				$entry->save();
				
			}
			
		}
		
	}
	
}

?>