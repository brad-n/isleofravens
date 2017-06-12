<?php

define('K', 32);

class PlayerAPI {
	
	
	
	/**
	 * @param Player $winner
	 * @param Player $loser
	 * @param bool $is_draw
	 */
	public function calculateELO(Player &$winner, Player &$loser, bool $is_draw = null){
		
		//check to make sure user has an ELO
		if(!$winner->elo) { $winner->elo = 2400;}
		if(!$loser->elo) { $loser->elo = 2400;}

		$r1 = pow(10, $winner->elo/400);
		$r2 = pow(10, $loser->elo/400);
			
		$e1 = $r1 / ($r1 + $r2);
		$e2 = $r2 / ($r1 + $r2);
		
		//if it's not a draw
		if(!$is_draw){
			$winner->elo = round($winner->elo + K * (1 - $e1));
			$loser->elo = round($loser->elo + K * (0 - $e2));
		}else{
			$winner->elo = ceil($winner->elo + K * (.5 - $e1));
			$loser->elo = ceil($loser->elo + K * (.5 - $e2));
		}
		
		
	}
	
	
}

?>