<?php 

require_once('lib/classes/base.class.php');

class Players extends Base {
	
	
	public $players;
	
	
	function __construct(&$db, $player_id=null, $player_name=null){
		
		$this->setDB($db);
		
	}

	
	
}

?>