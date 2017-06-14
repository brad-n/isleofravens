<?php 

require_once('lib/classes/base.class.php');

class TournamentPlayer extends Base {
	
	public $roster_id;
	public $tournament_id;
	public $player_id;
	public $faction;
	public $agenda;
	public $place;
	public $points;
	public $wins;
	public $losses;
	public $sos;
	public $esos;
	public $start_elo;
	public $end_elo;
	
	/** @var Player */
	public $player;
	
	public function __construct(&$db, $tournament_id = null, Player &$player){
		
		$this->setDB($db);
		$this->setTable('tournament_roster');
		$this->setID('roster_id');
		$this->fields = array('roster_id', 'tournament_id', 'player_id', 'faction', 'agenda','place', 'points', 'wins', 'losses', 'sos', 'esos', 'start_elo', 'end_elo');
		
		if($player){
			$this->setValue('player', $player);
		}
		
		if($tournament_id && $player){
			
			$data = $this->getTournamentPlayer($tournament_id, $player->player_id);
			
			if(is_array($data)){
				$this->setData($data);
			}
			
		}
		
		//we didn't find anything in the database.  so we manually set some variables
		if(!$this->roster_id){
			$this->tournament_id = $tournament_id;
		}
		
	}
	
	public function getTournamentPlayer($tournament_id, $player_id){
		$sql = "SELECT * FROM `".$this->getTable()."` WHERE tournament_id = '".$tournament_id."' AND player_id = '".$player_id."'";
		return $this->get($sql);
	}

	public function onBeforeSave(){
		if(!isset($this->player_id)){
			$this->player_id = $this->player->player_id;
		}
		return true;
	}
	
	public function onAfterInsert(){
		//after we add a player to the roster, we want to increment their tournament entries
		$this->player->setValue('entries', $this->player->entries + 1);
		$this->player->save();
		
	}
	
}

?>