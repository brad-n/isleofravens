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
		
		$sql = "select * FROM tournaments as t
				INNER JOIN tournament_roster as tr ON t.tournament_id = tr.tournament_id
				WHERE tr.player_id = '".$player->player_id."' ORDER BY date_end desc";
		$result = $this->getAll($sql);

		return $result;
		
	}
	
	public function saveAvgElo(){
		$this->avg_elo = $this->getAvgElo();
		$this->save();
		
	}
	
	public function getRounds(){
		$this->rounds = new TournamentRounds($this->db, $this->tournament_id);
		$this->rounds->getRounds();
	}
	
	public function getPlayerRounds($tournament_id, $player_id){
		
		$sql = "SELECT * FROM tournament_rounds WHERE (winner_id = '".$player_id."' OR loser_id = '".$player_id."') AND tournament_id = '".$tournament_id."' ORDER BY round_number asc";
		error_log($sql);
		$result = $this->getAll($sql);
		
		foreach($result as $key => $round){
			if($round['winner_id'] == $player_id){
				$result[$key]['opponent'] = new Player($GLOBALS['db'], $round['loser_id']);
			}else{
				$result[$key]['opponent'] = new Player($GLOBALS['db'], $round['winner_id']);
			}
			
		}
		error_log(print_r($result,1));
		return $result;
		
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