<?php 

require_once('lib/classes/base.class.php');

class TournamentRounds extends Base {
	
	public $tournament_id;
	
	/**
	 * @var TournamentRound[][]
	 */
	public $tournament_rounds;
	
	public function __construct(&$db, $tournament_id = null){
		$this->setDB($db);
		$this->setValue('tournament_rounds', array());
		$this->setValue('tournament_id', $tournament_id);
	}
	
	public function playerHasRound($round_number, Player $player){
		
		if(key_exists($round_number, $this->tournament_rounds)){
			foreach($this->tournament_rounds[$round_number] as $r){
				/* @var $r TournamentRound */
				if($player->player_id == $r->player_1_id || $player->player_id == $r->player_2_id){
					return true;
				}
			}
		}
		return false;
	}
	
	public function isRoundFinished($round_number, Player $player){
		if(key_exists($round_number, $this->tournament_rounds)){
			foreach($this->tournament_rounds[$round_number] as $r){
				/* @var $r TournamentRound */
				if($player->player_id == $r->player_1_id || $player->player_id == $r->player_2_id){
					if($r->winner_id || $r->is_draw){
						return true;
					}else{
						return false;
					}
				}
			}
		}
		return false;
	}
	
	public function findPlayerRound($round_number, Player $player){
	
		if(key_exists($round_number, $this->tournament_rounds)){
			foreach($this->tournament_rounds[$round_number] as $r){
				/* @var $r TournamentRound */
				if($player->player_id == $r->player_1_id || $player->player_id == $r->player_2_id){
					return $r;
				}
			}
		}
		return false;
	}
	
	
	public function getRounds(){
		
		$sql = "SELECT * FROM tournament_rounds WHERE tournament_id = '".$this->tournament_id."'";
		$result = $this->getAll($sql);
		
		//need to build our round as a TournamentRound object and push it to array
		if(is_array($result)){
			foreach($result as $round){
				
				$tr = new TournamentRound($this->db);
				$tr->setData($round);
				
				if(empty($this->tournament_rounds[$tr->round_number])){
					$this->tournament_rounds[$tr->round_number] = Array();
				}
				
				array_push($this->tournament_rounds[$tr->round_number],$tr);
				
			}
		}
		
	}
	
	public function addRound($round_number, Player $player_1, Player $player_2, $top_cut=null, $jp_game_id=null){
		
		$tr = new TournamentRound($this->db);
		$tr->setValue('jp_game_id', $this->tournament_id);
		$tr->setValue('tournament_id', $this->tournament_id);
		$tr->setValue('round_number', $round_number);
		$tr->setValue('player_1_id', $player_1->player_id);
		$tr->setValue('player_1_start_elo', $player_1->elo);
		$tr->setValue('player_2_id', $player_2->player_id);
		$tr->setValue('player_2_start_elo', $player_2->elo);
		
		$tr->save(true);
		
		if(!key_exists($tr->round_number, $this->tournament_rounds)){
			$this->tournament_rounds[$tr->round_number] = array();
		}
		
		array_push($this->tournament_rounds[$tr->round_number],$tr);
		
	}
	
	public function addRoundResult($round_number, Player $player_1, $player_1_points, Player $player_2, $player_2_points){
		
		$tr = $this->findPlayerRound($round_number, $player_1);
		
		//determine winner
		if($player_1_points > $player_2_points){	//player 1 won

			$tr->setValue('winner_id', $player_1->player_id);
			$tr->setValue('loser_id', $player_2->player_id);
			
			if($player_2->player_id > 0){
				$tr->saveNewELO($player_1, $player_2);
			}
			
		}elseif($player_2_points > $player_1_points){	//player 2 won
			$tr->setValue('loser_id', $player_1->player_id);
			$tr->setValue('winner_id', $player_2->player_id);
			
			if($player_2->player_id > 0){
				$tr->saveNewELO($player_2, $player_1);
			}
			
		}else{
			//it's a draw
			if($player_2->player_id > 0){
				$tr->saveNewELO($player_1, $player_2, true);
			}
		}

		$tr->setValue('player_1_end_elo', $player_1->elo);
		$tr->setValue('player_1_points', $player_1_points);
		
		$tr->setValue('player_2_end_elo', $player_2->elo);
		$tr->setValue('player_2_points', $player_2_points);
		
		$tr->save();
		
		
	}
	
	
	
	
	
}

?>