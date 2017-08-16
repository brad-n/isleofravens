<?php 

require_once('lib/classes/base.class.php');

class Expansion extends Base {
	
	public $expansion_id;
	public $game_id;
	public $expansion_name;
	
	
	
	function __construct(&$db, $expansion_id=null, $expansion_name=null){
		
		$this->db = $db;
		$this->setTable('expansions');
		$this->setID('expansion_id');
		$this->setFields(array('expansion_id', 'game_id', 'expansion_name'));
		
		if($expansion_id){
			$this->setValue('expansion_id', $this->__sanitize($expansion_id));
		}
		if($expansion_name){
			$this->setValue('expansion_name', $this->__sanitize($expansion_name));
		}
		
		$this->setValue('game_id', 1);
		
		if($expansion_id){
			$data = $this->getExpansionByID($this->__sanitize($expansion_id));
			if(is_array($data)){
				$this->setData($data);
			}
		}elseif($expansion_name){
			$data = $this->getExpansionByName($this->__sanitize($expansion_name));
			if(is_array($data)){
				$this->setData($data);
			}
		}
		
	}
	
	function getExpansionByID($id){
		$sql = "SELECT * FROM `".$this->getTable()."` WHERE expansion_id = '".$this->__sanitize($id)."'";
		return $this->get($sql);
	}
	
	function getExpansionByName($name){
		$sql = "SELECT * FROM `".$this->getTable()."` WHERE expansion_name = '".$this->__sanitize($name)."'";
		return $this->get($sql);
	}
	
}

?>