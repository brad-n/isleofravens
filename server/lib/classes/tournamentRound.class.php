<?php 
require_once('lib/classes/base.class.php');

define('K', 32);

class TournamentRound extends Base {
	
	public $round_id;
	public $jp_game_id;
	public $tournament_id;
	public $round_number;
	public $winner_id;
	public $loser_id;
	public $is_draw;
	public $player_1_id;
	public $player_1_start_elo;
	public $player_1_end_elo;
	public $player_1_points;
	public $player_2_id;
	public $player_2_start_elo;
	public $player_2_end_elo;
	public $player_2_points;
	public $top_cut;
	
	public $winning_player;
	public $losing_player;
	
	function __construct(&$db, interger $round_id = null){
		
		$this->setDB($db);
		$this->table = 'tournament_rounds';
		$this->id = 'round_id';
		$this->fields = array('round_id', 'jp_game_id', 'tournament_id', 'round_number', 'winner_id', 'loser_id', 'is_draw', 'player_1_id', 'player_1_start_elo', 'player_1_end_elo', 'player_1_points', 'player_2_id', 'player_2_start_elo', 'player_2_end_elo', 'player_2_points', 'top_cut');
		
		if($round_id){
			$sql = "Select * FROM `".$this->table."` WHERE `".$this->id."` = ".$round_id;
			$this->setData($this->get($sql));
		}
		
	}

	public function saveNewELO(Player $winner, Player $loser){
	
		//check to make sure user has an ELO
		if(!$winner->elo) { $winner->elo = 1400;}
		if(!$loser->elo) { $loser->elo = 1400;}
	
		$r1 = pow(10, $winner->elo/400);
		$r2 = pow(10, $loser->elo/400);
			
		$e1 = $r1 / ($r1 + $r2);
		$e2 = $r2 / ($r1 + $r2);
	
		//is this a BYE?  If so we just record it as a win and don't touch Elo
		if($loser->id == -1){
			$winner->setValue('wins', $winner->wins + 1);
			$winner->save();
			return true;
		}
		
		//if it's not a draw
		if(!$this->is_draw){
			
			$winner->setValue('elo', round($winner->elo + K * (1 - $e1)));
			$winner->setValue('wins', $winner->wins + 1);
			
			$loser->setValue('elo', round($loser->elo + K * (0 - $e2)));
			$loser->setValue('losses', $loser->losses + 1);
			
		}else{
			
			$winner->setValue('elo', round($winner->elo + K * (.5 - $e1)));
			
			$loser->setValue('elo', round($loser->elo + K * (.5 - $e2)));
			
		}
		
		$winner->save();
		$loser->save();
	
	}
	
	function onBeforeSave(){
		
		//check to see if our players are in the roster
		
		//if not add them
		
		//if yes, update points
		
		//recalculate ELO for players
		return true;
		
	}
	
	
}

?>