<?php 
ini_set('display_errors',1);
error_reporting(E_ALL);
$html = file_get_contents("http://thejoustingpavilion.com/tournaments");


$dom = new domDocument;
$dom->loadHTML($html);

$tourneys = array();

//all of the entries are in table rows
$rows = $dom->getElementsByTagName("tr");

foreach($rows as $row){
	
	//get each rows cols so we can check them for 'running now'
	$cols = $row->getElementsByTagName('td');

	//the first column will have 'running now' in the value if it's an ongoing tournament
	if(strstr(@$cols[0]->nodeValue, 'Running now')){
		
		//to get the tournament id, we need to pull it out of the link
		$link = $cols[0]->getElementsByTagName('a');
		
		//the links is {{route}}/{{id}}, the route is static, we can replace it with nothing
		//and be left with just the id we want.
		$res['tournament_id'] = str_replace('/tournaments/', '', $link[0]->getAttribute('href'));
		
		//the tournament name is the value of the link tag
		$res['name'] = $link[0]->nodeValue;
		
		//add it to our stack of tournaments
		array_push($tourneys, $res);
	}
	
}


//now we have all the tournaments, we can get round data about them.
foreach($tourneys as $key => $tourney){
	
	echo "<h3>".$tourney['name']."</h3><br/>";
	
	$html = file_get_contents("http://thejoustingpavilion.com/tournaments/".$tourney['tournament_id']."/games");
	$dom->loadHTML($html);
	
	//all of the rounds are going to be wrapped in a tbody tag
	//and the most recent will be first.
	$tbodies = $dom->getElementsByTagName('tbody');

	//loop over the rounds
	foreach($tbodies as $tbody){
		
		//the matches are in table rows, each row is a match
		$rows = $tbody->getElementsByTagName('tr');
		
		//loop over the matches to get the details for each match
		foreach($rows as $row){
			
			//the jp match id is embeded as the name attribute of an ahref in the first column
			//
			//
			
			
			//each player is wrapped in a link to their profile, so we can grab the links out of
			//the row to get our two players.  There is an empty link for the match# so player 1 is index 1
			$links = $row->getElementsByTagName('a');
			$cols = $row->getElementsByTagName('td');
			echo "<b>(".str_replace('game-', '', $links[0]->getAttribute('name')).")</b> ";
			$result = explode("–", str_replace(" ", '', @$cols[2]->nodeValue));

			//determine if player 1 or 2 is the winner
			if(count($result) > 1){
				if($result[0] > 0){ echo "(W) ";}
				echo @$links[1]->nodeValue." vs. ".@$links[2]->nodeValue;
				if($result[1] > 0){ echo "(W) ";}
			}else{
				echo @$links[1]->nodeValue." vs. ".@$links[2]->nodeValue;
			}
			
			
			echo "<br/>";
		}
		
		echo "<hr></hr>";
		
	}
	
	
}


poop($tourneys);


function poop($array){
	echo "<pre>";
	print_r($array);
	echo "</pre>";
}



?>