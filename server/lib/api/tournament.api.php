<?php 
class TournamentAPI {

	private $db;
	
	function __construct(&$db){
		$this->db = $db;
	}

	/**
	 * Adds a tournament to the database
	 * @param Array|Object $add_data
	 */
	function addtournament($add_data){
	
		if(is_object($add_data)){
			//look up expansion ID if it's nto here
			//if(empty($add_data->expansion_id) && !empty($add_data->expansion_name)){
				
				$expansion = $this->getExpansionByName($add_data->expansion);
				
				//if we didn't find an expansion, add it
				if(empty($expansion)){
					$expansion_id = $this->addExpansion($add_data->expansion);
				}else{
					$expansion_id = $expansion['expansion_id'];
				}

				if(!$expansion_id){
					echo "Couldn't find expansion or add it!!!<br/>";
					return false;
				}
				
			//}
			
			$name = $this->__sanatize($add_data->tournament_name);
			$jp_id = $this->__sanatize($add_data->tournament_id);
			$region = $this->__sanatize($add_data->region);
			$country = $this->__sanatize($add_data->country);
			$player_count = $this->__sanatize($add_data->player_count);
			$end_date = $this->__sanatize($add_data->date_end);
			
			$sql = "INSERT INTO `isleofravens`.`tournaments` (`id` ,`jp_id` ,`country` ,`region` ,`name` ,`expansion_id` ,`date_end` ,`player_count` ,`game_id`)
					VALUES (NULL , '".$jp_id."', '".$country."', '".$region."', '".$name."', '".$expansion_id."', '".$end_date."', '".$player_count."', '1')";
			
		}
		
		$result = mysqli_query($this->db, $sql);
		
		if($result){
			return mysqli_insert_id($this->db);
		}else{
			return false;
		}
	
	
	}
	
	
	
	/**
	 * Gets a tournament by the JoustingPavilion ID 
	 */
	function getTournamentByJPID($jp_id){
		
		$jp_id = $this->__sanatize($jp_id);
		$sql = "SELECT * FROM tournaments WHERE jp_id = ".$jp_id;
		$result = mysqli_query($this->db, $sql);
		
		if($result){
			return mysqli_fetch_assoc($result);
		}else{
			return false;
		}
		
	}
	
	/**
	 * Gets a tournament by the ID 
	 */
	function getTournamentByID($id){
		
		$id = $this->__sanatize($id);
		$sql = "SELECT * FROM tournaments WHERE id = ".$id;
		$result = mysqli_query($this->db, $sql);
		
		if($result){
			return mysqli_fetch_assoc($result);
		}else{
			return false;
		}
		
	}

	
	function addExpansion($name, $game_id = 1){
		
		$sql = "INSERT INTO `isleofravens`.`expansions` (`expansion_id`, `game_id`, `expansion_name`) VALUES (NULL, '".$game_id."', '".$this->__sanatize($name)."');";
		$result = mysqli_query($this->db, $sql);
		
		if($result){
			return mysqli_insert_id($this->db);
		}else{
			return false;
		}
		
	}
	
	
	/**
	 * Gets an expansion by name
	 * @param unknown $name
	 */
	function getExpansionByName($name){
		$id = $this->__sanatize($id);
		$sql = "SELECT * FROM expansions WHERE expansion_name = ".$name;
		$result = mysqli_query($this->db, $sql);
		
		if($result){
			return mysqli_fetch_assoc($result);
		}else{
			return false;
		}
	}
	
	
	function __sanatize($input){
		return mysqli_real_escape_string($this->db, $input);
	}


}


?>