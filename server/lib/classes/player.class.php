<?php 

require_once('lib/classes/base.class.php');

class Player extends Base {
	
	public $player_id;
	public $jp_player_id;
	public $name;
	public $elo;
	public $wins;
	public $losses;
	public $titles;
	public $entries;
	public $date_created;
	
	
	function __construct(&$db, $player_id=null, $player_name=null){
		
		$this->setDB($db);
		
		$this->setTable('players');

		$this->setID('player_id');
		$this->setFields(array('player_id', 'jp_player_id', 'name', 'elo', 'wins', 'losses', 'titles', 'entries', 'date_created'));
		
		if($player_id){
			$data = $this->getPlayerByID($player_id);
			if($data){
				$this->setData($data);
			}
		}elseif($player_name){
			$data = $this->getPlayerByName($player_name);
			if(empty($data)){
				$data['name'] = $player_name;
				$data['elo'] = 1400;
			}
			$this->setData($data);
		}
		
	}
	
	public function searchForPlayer($name){
		$q = "Select * FROM players WHERE name LIKE '%".mysqli_real_escape_string($this->db,$name)."%' LIMIT 0,10";
		$results = $this->getAll($q);
		
		$return = array();
		if($results){
			foreach($results as $result){
				$pObj = new Player($this->db);
				$pObj->setData($result);
				$return[] = $pObj;
			}
		}
		
		return $return;
		
	}
	
	function getPlayerByID($player_id){
		$sql = "SELECT * FROM `".$this->getTable()."` WHERE player_id = '".$player_id."'";
		return $this->get($sql);
	}
	
	public function setPlayerByJPID($jp_player_id){
		$data = $this->getPlayerByJPID($jp_player_id);
		if(is_array($data)){
			$this->setData($data);
		}
	}
	
	function getPlayerByJPID($jp_player_id){
		$sql = "SELECT * FROM `".$this->getTable()."` WHERE jp_player_id = '".$jp_player_id."'";
		return $this->get($sql);
	}
	
	function getPlayerByName($name){
		$sql = "SELECT * FROM `".$this->getTable()."` WHERE name = '".$this->__sanitize($name)."'";
		return $this->get($sql);
	}
	
	public function getPlayerNemeses(){
		$sql = "select players.name, players.elo, winner_id, count(winner_id) as defeats, (select count(round_id) FROM tournament_rounds as tr2 WHERE (tr2.winner_id = ".$this->player_id." AND tr2.loser_id = tr.winner_id) OR (tr2.winner_id = tr.winner_id AND tr2.loser_id = ".$this->player_id.")) as rounds_played
					FROM tournament_rounds as tr
					inner join players on players.player_id = winner_id
					WHERE loser_id = ".$this->player_id."  AND winner_id != ".$this->player_id." GROUP BY winner_id 
					HAVING (rounds_played - defeats) < defeats AND rounds_played > 1
					order by defeats desc, rounds_played asc
					limit 0,3";
		$result = $this->getAll($sql);
		
		return $result;
		
	}
	
	public function getPlayerRivals(){
		$sql = "SELECT p.name, p.elo, loser_id, count(winner_id) as wins,
					(SELECT count(round_id) FROM tournament_rounds as tr2 WHERE ( (tr2.player_1_id = ".$this->player_id." AND tr2.player_2_id = tr.loser_id) OR (tr2.player_1_id = tr.loser_id AND tr2.player_2_id = ".$this->player_id.")  )) as rounds_played
				FROM tournament_rounds as tr
				INNER JOIN players as p ON tr.loser_id = p.player_id
				WHERE winner_id = ".$this->player_id." AND loser_id != ".$this->player_id."
				GROUP BY loser_id
				HAVING rounds_played > 1 AND wins >= (rounds_played - wins)
				ORDER BY wins desc, rounds_played asc
				LIMIT 0,3";
		$result = $this->getAll($sql);
		
		return $result;
		
	}
	
	public function getTopPlayers($top_x){
		$sql = "SELECT *, 
					(SELECT faction FROM tournament_roster as tr WHERE player_id = players.player_id GROUP BY faction ORDER BY count(faction) desc limit 0,1) as most_played_faction
				FROM players
				ORDER BY elo desc LIMIT 0, ".$this->__sanitize($top_x);
		$result = $this->getAll($sql);
		
		return $result;
		
	}
	
	public function getAllPlayers($opts=array()){
		
		if(empty($opts['limit'])){
			$opts['limit'] = 25;
		}
		if(empty($opts['offset'])){
			$opts['offset'] = 0;
		}
		if(empty($opts['order_by'])){
			$opts['order_by'] = 'elo';
		}
		
		$sql = "SELECT *,
					(SELECT faction FROM tournament_roster as tr WHERE player_id = players.player_id GROUP BY faction ORDER BY count(faction) desc limit 0,1) as most_played_faction
				FROM players
				ORDER BY ".$this->__sanitize($opts['order_by'])." desc, name asc LIMIT ".$this->__sanitize($opts['offset']).", ".$this->__sanitize($opts['limit']);
		error_log($sql);
		$result['players'] = $this->getAll($sql);

		if(!$opts['have_total']){
			$sql = "SELECT count(player_id) as total FROM players";
			$result['total'] = $this->get($sql);
		}
		
		return $result;
		
		
	}
	
	
}

?>