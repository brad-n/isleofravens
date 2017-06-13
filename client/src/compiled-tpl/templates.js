angular.module('templates-main', ['js/player/player_details.html', 'js/player/player_nemesis.html', 'js/player/player_rival.html', 'js/player/player_rounds.html', 'js/player/player_tournaments.html', 'js/player/top_players.html', 'js/search/main.html']);

angular.module("js/player/player_details.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("js/player/player_details.html",
    "<div>\n" +
    "	<div class=\"panel-heading\">\n" +
    "		<h3 class=\"panel-title\"><a href=\"player/{{player.player_id}}\">{{player.name}}</a> ({{player.elo}})</h3>\n" +
    "	</div>\n" +
    "  	<div class=\"panel-body\">\n" +
    "   		<div class=\"row\">\n" +
    "   			<div class=\"col-xs-6 col-md-3\">\n" +
    "   				<div class=\"col-xs-12\"><b>Entries</b></div>\n" +
    "   				<div class=\"col-xs-12\">{{player.entries}}</div>\n" +
    "   			</div>\n" +
    "			<div class=\"col-xs-6 col-md-3\">\n" +
    "   				<div class=\"col-xs-12\"><b>Win</b></div>\n" +
    "   				<div class=\"col-xs-12\">{{player.wins}}</div>\n" +
    "   			</div>\n" +
    "			<div class=\"col-xs-6 col-md-3\">\n" +
    "   				<div class=\"col-xs-12\"><b>Loss</b></div>\n" +
    "   				<div class=\"col-xs-12\">{{player.losses}}</div>\n" +
    "   			</div>\n" +
    "			<div class=\"col-xs-6 col-md-3\">\n" +
    "   				<div class=\"col-xs-12\"><b>Win%</b></div>\n" +
    "   				<div class=\"col-xs-12\">{{ ((player.wins/(player.wins+player.losses))*100).toFixed(2) }}%</div>\n" +
    "   			</div>\n" +
    "   		</div>\n" +
    "		   		\n" +
    "   		<div class=\"row\">\n" +
    "   			<div class=\"col-xs-12 col-md-6\">\n" +
    "   				<player-nemesis player=\"player\"></player-nemesis>\n" +
    "   			</div>\n" +
    "		   			\n" +
    "			<div class=\"col-xs-12 col-md-6\">\n" +
    "				<player-rival player=\"player\"></player-rival>\n" +
    "			</div>\n" +
    "		   			\n" +
    "		</div>\n" +
    "		   		\n" +
    "		   		<div class=\"row\">\n" +
    "		   			<div class=\"col-xs-12 text-center\">\n" +
    "						<player-tournaments player=\"player\"></player-tournaments>\n" +
    "		   			</div>\n" +
    "		   		</div>\n" +
    "	 		</div>\n" +
    "	 		<hr></hr>\n" +
    "</div>");
}]);

angular.module("js/player/player_nemesis.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("js/player/player_nemesis.html",
    "<div>\n" +
    "	<h3>Nemeses</h3>\n" +
    "	<table ng-if=\"player.nemeses.length > 0\" class=\"table table-responsive\">\n" +
    "		<tr>\n" +
    "			<td>Nemesis</td>\n" +
    "			<td>Win</td>\n" +
    "			<td>Loss</td>\n" +
    "		</tr>\n" +
    "		<tr ng-repeat=\"nemesis in player.nemeses\">\n" +
    "			<td><a href=\"player/{{nemesis.winner_id}}\">{{nemesis.name}} ({{nemesis.elo}})</a></td>\n" +
    "			<td>{{nemesis.rounds_played-nemesis.defeats}}\n" +
    "			<td>{{nemesis.defeats}}</td>\n" +
    "		</tr>\n" +
    "	</table>\n" +
    "	<i ng-if=\"player.nemeses.length < 1\">Play more matches.  Make more enemies.</i>\n" +
    "</div>");
}]);

angular.module("js/player/player_rival.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("js/player/player_rival.html",
    "<div>\n" +
    "	<h3>Rivals</h3>\n" +
    "	<table ng-if=\"player.rivals.length > 0\" class=\"table table-responsive\">\n" +
    "		<tr>\n" +
    "			<td>Rival</td>\n" +
    "			<td>Win</td>\n" +
    "			<td>Loss</td>\n" +
    "		</tr>\n" +
    "		<tr ng-repeat=\"rival in player.rivals\">\n" +
    "			<td><a href=\"player/{{rival.loser_id}}\">{{rival.name}} ({{rival.elo}})</a></td>\n" +
    "			<td>{{rival.wins}}\n" +
    "			<td>{{rival.rounds_played - rival.wins}}</td>\n" +
    "		</tr>\n" +
    "	</table>\n" +
    "	<i ng-if=\"player.rivals.length < 1\">Play more matches.  BE the enemy.</i>\n" +
    "</div>");
}]);

angular.module("js/player/player_rounds.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("js/player/player_rounds.html",
    "<div class=\"text-center\">\n" +
    "	<a href=\"javascript:void(0);\" class=\"collapsed\" data-toggle=\"collapse\" data-target=\"#collapseRounds-{{tid}}\" aria-expanded=\"false\" aria-controls=\"collapseExample\">\n" +
    "		<span class=\"if-collapsed\" ng-click=\"loadPlayerRounds()\">Show Rounds</span>\n" +
    "		<span class=\"if-not-collapsed\">Hide Rounds</span>\n" +
    "	</a>\n" +
    "	<div class=\"collapse text-left\" id=\"collapseRounds-{{tid}}\">\n" +
    "		<table class=\"table table-response\">\n" +
    "			<tr>\n" +
    "				<td>Round#</td>\n" +
    "				<td>Result</td>\n" +
    "				<td>End Eol</td>\n" +
    "				<td>Start Eol</td>\n" +
    "				<td>Change</td>\n" +
    "				<td>Opponent</td>\n" +
    "				<td>End Eol</td>\n" +
    "				<td>Start Eol</td>\n" +
    "				<td>Change</td>\n" +
    "			</tr>\n" +
    "			<tbody>\n" +
    "				<tr ng-repeat=\"r in rounds\">\n" +
    "					<td>{{r.round_number}}</td>\n" +
    "					<td>\n" +
    "						<span ng-if=\"r.winner_id == player.player_id\" style=\"color:green\">Win</span>\n" +
    "						<span ng-if=\"r.winner_id != player.player_id\" style=\"color:red\">Loss</span>\n" +
    "					</td>\n" +
    "					<td>\n" +
    "						<span ng-if=\"r.player_1_id == player.player_id\">{{r.player_1_end_elo}}</span>\n" +
    "						<span ng-if=\"r.player_1_id != player.player_id\">{{r.player_2_end_elo}}</span>\n" +
    "					</td>\n" +
    "					<td>\n" +
    "						<span ng-if=\"r.player_1_id == player.player_id\">{{r.player_1_start_elo}}</span>\n" +
    "						<span ng-if=\"r.player_1_id != player.player_id\">{{r.player_2_start_elo}}</span>\n" +
    "					</td>\n" +
    "					<td>\n" +
    "						<span ng-if=\"r.player_1_id == player.player_id\">\n" +
    "							<span ng-if=\"r.player_1_end_elo-r.player_1_start_elo > 0\" style=\"color:green\">{{r.player_1_end_elo-r.player_1_start_elo}}</span>\n" +
    "							<span ng-if=\"r.player_1_end_elo-r.player_1_start_elo <= 0\" style=\"color:red\">{{r.player_1_end_elo-r.player_1_start_elo}}</span>\n" +
    "						</span>\n" +
    "						<span ng-if=\"r.player_2_id == player.player_id\">\n" +
    "							<span ng-if=\"r.player_2_end_elo-r.player_2_start_elo > 0\" style=\"color:green\">{{r.player_2_end_elo-r.player_2_start_elo}}</span>\n" +
    "							<span ng-if=\"r.player_2_end_elo-r.player_2_start_elo <= 0\" style=\"color:red\">{{r.player_2_end_elo-r.player_2_start_elo}}</span>\n" +
    "						</span>\n" +
    "					</td>\n" +
    "					<td><a href=\"player/{{r.opponent.player_id}}\">{{r.opponent.name}}</a> ({{r.opponent.elo}})</td>\n" +
    "					<td>\n" +
    "						<span ng-if=\"r.player_1_id == player.player_id\">{{r.player_2_end_elo}}</span>\n" +
    "						<span ng-if=\"r.player_1_id != player.player_id\">{{r.player_1_end_elo}}</span>\n" +
    "					</td>\n" +
    "					<td>\n" +
    "						<span ng-if=\"r.player_1_id == player.player_id\">{{r.player_2_start_elo}}</span>\n" +
    "						<span ng-if=\"r.player_1_id != player.player_id\">{{r.player_1_start_elo}}</span>\n" +
    "					</td>\n" +
    "					<td>\n" +
    "						<span ng-if=\"r.player_1_id == player.player_id\">\n" +
    "							<span ng-if=\"r.player_2_end_elo-r.player_2_start_elo > 0\" style=\"color:green\">{{r.player_2_end_elo-r.player_2_start_elo}}</span>\n" +
    "							<span ng-if=\"r.player_2_end_elo-r.player_2_start_elo <= 0\" style=\"color:red\">{{r.player_2_end_elo-r.player_2_start_elo}}</span>\n" +
    "						</span>\n" +
    "						<span ng-if=\"r.player_2_id == player.player_id\">\n" +
    "							<span ng-if=\"r.player_1_end_elo-r.player_1_start_elo > 0\" style=\"color:green\">{{r.player_1_end_elo-r.player_1_start_elo}}</span>\n" +
    "							<span ng-if=\"r.player_1_end_elo-r.player_1_start_elo <= 0\" style=\"color:red\">{{r.player_1_end_elo-r.player_1_start_elo}}</span>\n" +
    "						</span>\n" +
    "					</td>\n" +
    "				</tr>\n" +
    "			</tbody>\n" +
    "		</table>\n" +
    " 	</div>\n" +
    " 	<hr></hr>\n" +
    "</div>");
}]);

angular.module("js/player/player_tournaments.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("js/player/player_tournaments.html",
    "<div>\n" +
    "	<a href=\"javascript:void(0);\" class=\"collapsed\" data-toggle=\"collapse\" data-target=\"#collapseTournaments-{{player.player_id}}\" aria-expanded=\"false\" aria-controls=\"collapseExample\">\n" +
    "		<span class=\"if-collapsed\" ng-click=\"loadPlayerTournaments()\">Show Tournaments</span>\n" +
    "		<span class=\"if-not-collapsed\">Hide Tournaments</span>\n" +
    "  	</a>\n" +
    "	<div class=\"collapse text-left\" id=\"collapseTournaments-{{player.player_id}}\">\n" +
    "  		<div class=\"well\">\n" +
    "  			<div class=\"row\" ng-repeat=\"t in tournaments\">\n" +
    "	  			<h3 class=\"text-left\">{{t.name}}</h3>\n" +
    "    			\n" +
    "				<div class=\"row\">\n" +
    "    				<div class=\"col-xs-12\">\n" +
    "    					<b>{{t.faction}} {{t.agenda}}</b><br/>\n" +
    "    					<span ng-if=\"t.end_elo > 0 && t.end_elo - t.start_elo > 0\" style=\"color:green\">{{t.end_elo - t.start_elo}}</span>\n" +
    "    					<span ng-if=\"t.end_elo > 0 && t.end_elo - t.start_elo <= 0\"style=\"color:red\">{{t.end_elo - t.start_elo}}</span>\n" +
    "    					<br/>\n" +
    "    				</div>\n" +
    "    			</div>\n" +
    "    			\n" +
    "				<div class=\"row\">\n" +
    "		   			<div class=\"col-xs-6 col-md-3\">\n" +
    "		   				<div class=\"col-xs-12\"><b>End Elo</b></div>\n" +
    "		   				<div class=\"col-xs-12\">{{t.end_elo}}</div>\n" +
    "		   			</div>\n" +
    "					<div class=\"col-xs-6 col-md-3\">\n" +
    "		   				<div class=\"col-xs-12\"><b>Start Elo</b></div>\n" +
    "		   				<div class=\"col-xs-12\">{{t.start_elo}}</div>\n" +
    "		   			</div>\n" +
    "					<div class=\"col-xs-6 col-md-3\">\n" +
    "		   				<div class=\"col-xs-12\"><b>Players</b></div>\n" +
    "		   				<div class=\"col-xs-12\">{{t.player_count}}</div>\n" +
    "		   			</div>\n" +
    "					<div class=\"col-xs-6 col-md-3\">\n" +
    "		   				<div class=\"col-xs-12\"><b>Date</b></div>\n" +
    "		   				<div class=\"col-xs-12\">{{t.date_end}}</div>\n" +
    "		   			</div>\n" +
    "		   		</div>\n" +
    "		   		<player-rounds tid=\"t.tournament_id\" player=\"player\"></player-rounds>\n" +
    "		   		\n" +
    "   			</div>\n" +
    "  		\n" +
    "  		</div>\n" +
    "  	</div>\n" +
    "</div>");
}]);

angular.module("js/player/top_players.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("js/player/top_players.html",
    "<div>\n" +
    "	<h3>Top Players</h3>\n" +
    "	<table class=\"table table-responsive table-hover table-striped\">\n" +
    "		<thead>\n" +
    "			<tr>\n" +
    "				<th>#</th>\n" +
    "				<th>Name</th>\n" +
    "				<th>Elo</th>\n" +
    "				<th>Wins</th>\n" +
    "				<th>Losses</th>\n" +
    "				<th>Entries</th>\n" +
    "				<th>Most Played</th>\n" +
    "			</tr>\n" +
    "		</thead>\n" +
    "		<tbody>\n" +
    "			<tr ng-repeat=\"player in top_players\">\n" +
    "				<td>{{$index+1}}</td>\n" +
    "				<td><a href=\"player/{{player.player_id}}\">{{player.name}}</a></td>\n" +
    "				<td>{{player.elo}}</td>\n" +
    "				<td>{{player.wins}}</td>\n" +
    "				<td>{{player.losses}}</td>\n" +
    "				<td>{{player.entries}}</td>\n" +
    "				<td>{{player.most_played_faction}}</td>\n" +
    "			</tr>\n" +
    "		</tbody>\n" +
    "	</table>\n" +
    "</div>");
}]);

angular.module("js/search/main.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("js/search/main.html",
    "<style>\n" +
    "[data-toggle=\"collapse\"].collapsed .if-not-collapsed {\n" +
    "  display: none;\n" +
    "}\n" +
    "[data-toggle=\"collapse\"]:not(.collapsed) .if-collapsed {\n" +
    "  display: none;\n" +
    "}\n" +
    "</style>\n" +
    "\n" +
    "\n" +
    "<div class=\"panel panel-default\">\n" +
    "  <div class=\"panel-body center-block text-center\">\n" +
    "	<form class=\"form-inline\">\n" +
    "	  <div class=\"form-group\">\n" +
    "	      <input type=\"text\" class=\"form-control\" id=\"playerSearch\" name=\"name\" placeholder=\"Player Name\" ng-model=\"search_str\" />\n" +
    "	  </div>\n" +
    "	  <button ng-click=\"searchPlayer()\" class=\"btn btn-primary\">Search</button>\n" +
    "	</form>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<div ng-if=\"loading\">Loading...</div>\n" +
    "\n" +
    "<div ng-if=\"players.length <= 0 && !loading\">\n" +
    "	<top-players count=\"25\">Loading...</top-players>\n" +
    "</div>\n" +
    "\n" +
    "<div ng-if=\"players.length > 0 && !loading\">\n" +
    "\n" +
    "	<div class=\"panel panel-default\">\n" +
    "		<div ng-repeat=\"player in players\">\n" +
    "			<player-details player=\"player\"></player-details>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);
