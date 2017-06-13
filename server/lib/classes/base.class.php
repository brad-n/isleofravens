<?php

class Base {
	
	protected $db;
	private $fields;
	private $table;
	
	public $id;
	

	
	public function setDB(&$db){
		$this->db = $db;
	}
	
	public function setID($id){
		$this->id = $id;
	}
	
	public function setFields($fields){
		$this->fields = $fields;
	}
	
	public function setValue($field, $value){
		$this->$field = $value;
	}
	
	public function setData(Array $fields){
		foreach($this->fields as $field){
			if(isset($fields[$field])){
				$this->$field = $fields[$field];
			}
		}
	}
	
	/**
	 * Returns an associative array of one record for the passed query.
	 * 
	 * @param String $query
	 * @return array[]|boolean
	 */
	public function get($query){
		
		if(isset($GLOBALS['debug'])){
			echo $query;
		}
		
		$result = mysqli_query($this->db, $query);
		
		if($result){
			return mysqli_fetch_assoc($result);
		}else{
			return false;
		}
	}
	
	/**
	 * Returns an array of associative arrays records for the passed query.
	 * 
	 * @param string $query
	 * @return array[]|boolean
	 */
	public function getAll($query){
	
		if(isset($GLOBALS['debug'])){
			echo $query;
		}
	
		$result = mysqli_query($this->db, $query);
	
		if($result){
			$return = array();
			while($row = mysqli_fetch_assoc($result)){
				$return[] = $row;
			}
			return $return;
		}else{
			return false;
		}
	}
	
	//
	
	/**
	 * Called by Base::save before the save happens, canceling processing if false is returned.
	 * 
	 * @return boolean
	 */
	public function onBeforeSave(){
		return true;
	}
	
	/**
	 * Called by Base::save after the save happens
	 * 
	 * @return boolean
	 */
	public function onAfterSave(){
		return true;
	}
	
	public function save(){
		if(method_exists($this, 'onBeforeSave')){
			if(!$this->onBeforeSave()){
				return false;
			}
		}

		//are we adding or updating?
		if($this->{$this->id}){
			$sql = "UPDATE ".$this->table." SET ";
			foreach($this->fields as $field){
				$sql .= $field." = '".$this->__sanitize($this->{$field})."',";
			}
			$sql = substr($sql, 0,-1);
			$sql .= " WHERE `".$this->id."` = ".$this->{$this->id};
			$result = mysqli_query($this->db, $sql);
		}else{
			$sql = "INSERT INTO ".$this->table." SET ";	
			foreach($this->fields as $field){
				$sql .= $field." = '".$this->__sanitize($this->{$field})."',";
			}
			$sql = substr($sql, 0,-1);
			mysqli_query($this->db, $sql);
			$this->{$this->id} = mysqli_insert_id($this->db);
			
			if($this->{$this->id} && method_exists($this, 'onAfterInsert')){
				$this->onAfterInsert();
			}
			
		}
		
		if(isset($GLOBALS['debug'])){
			echo $sql."<br/>";
		}
		
		if(method_exists($this, 'onAfterSave')){
			$this->onAfterSave();
		}
		
	}
	
	function __sanitize($input){
		return mysqli_real_escape_string($this->db, $input);
	}
	
}

?>