angular.module('templates-main', ['js/contact/contact.html', 'js/faq/faq.html', 'js/header/header.tpl.html', 'js/player/faction_winloss.html', 'js/player/player_details.html', 'js/player/player_nemesis.html', 'js/player/player_rival.html', 'js/player/player_rounds.html', 'js/player/player_tournaments.html', 'js/player/top_players.html', 'js/search/main.html', 'js/search/search_form.tpl.html', 'js/search/search.html', 'js/whatsnew/whatsnew.html']);

angular.module("js/contact/contact.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("js/contact/contact.html",
    "<div class=\"col-lg-12 col-md-12 col-sm-12\">\n" +
    "  <div class=\"alert alert-danger\" ng-show=\"error\">\n" +
    "    <button class=\"close\" data-dismiss=\"alert\">x</button>\n" +
    "    <strong>Error!</strong> An error occured while trying to send message.\n" +
    "  </div>\n" +
    "  <div class=\"alert alert-success\" ng-show=\"success\">\n" +
    "    <button class=\"close\" data-dismiss=\"alert\">x</button>\n" +
    "    <strong>Success! </strong> Your message was successfully sent.\n" +
    "  </div>\n" +
    "  <div ng-if=\"!success\">\n" +
    "    <div class=\"form-group\" ng-class=\"{error: contactForm.name.$invalid}\">\n" +
    "    <label>Full Name</label>\n" +
    "    <input class=\"form-control\" type=\"text\" name=\"name\" ng-model=\"user.name\" required=\"required\" placeholder=\"Your name\">\n" +
    "      <span class=\"help-block\" ng-show=\"contactForm.name.$error.required\">Required</span>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\" ng-class=\"{error: contactForm.email.$invalid}\">\n" +
    "      <label>Email</label>\n" +
    "      <input class=\"form-control\" type=\"email\" name=\"email\" ng-model=\"user.email\" required=\"required\" placeholder=\"Your email address\">\n" +
    "      <span class=\"help-block\" ng-show=\"contactForm.email.$error.required\">Required</span>\n" +
    "      <span class=\"help-block\" ng-show=\"contactForm.email.$error.email\">Invalid email address</span>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\" ng-class=\"{error: contactForm.message.$invalid}\">\n" +
    "      <label>Message</label>\n" +
    "      <textarea class=\"form-control\" rows=\"5\" name=\"message\" ng-model=\"user.message\" required=\"required\" placeholder=\"Your messsage\"></textarea>\n" +
    "      <span class=\"help-inline\" ng-show=\"contactForm.message.$error.required\">Required</span>\n" +
    "    </div>\n" +
    "    <button class=\"btn btn-primary btn-lg btn-block\" ng-click=\"send()\" ng-disabled=\"contactForm.$invalid\">Send</button>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("js/faq/faq.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("js/faq/faq.html",
    "<div class=\"panel-group\" id=\"accordion\">\n" +
    "	<div class=\"panel panel-default\" ng-repeat=\"faq in faqs\">\n" +
    "		<div class=\"panel-heading\">\n" +
    "			<h4 class=\"panel-title\">\n" +
    "				<a class=\"accordion-toggle\" ng-class=\"$index!=0?'collapsed':''\" href=\"javascript:void(0);\" data-toggle=\"collapse\" data-parent=\"#accordion\" data-target=\"#collapse{{faq.id}}\" aria-expanded=\"false\">{{faq.q}}</a>\n" +
    "			</h4>\n" +
    "		</div>\n" +
    "		<div id=\"collapse{{faq.id}}\" class=\"panel-collapse collapse\"  ng-class=\"$index!=0?'':'in'\" aria-expanded=\"false\">\n" +
    "			<div class=\"panel-body\">\n" +
    "				<div ng-bind-html=\"toTrustedHTML(faq.a)\"></div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("js/header/header.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("js/header/header.tpl.html",
    "<nav class=\"navbar navbar-default navbar-fixed-top\">\n" +
    "      <div class=\"container\">\n" +
    "        <div class=\"navbar-header\">\n" +
    "          <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">\n" +
    "            <span class=\"sr-only\">Toggle navigation</span>\n" +
    "            <span class=\"icon-bar\"></span>\n" +
    "            <span class=\"icon-bar\"></span>\n" +
    "            <span class=\"icon-bar\"></span>\n" +
    "          </button>\n" +
    "      		<a class=\"navbar-brand\" href=\"{{baseURL}}\">\n" +
    "        		<img alt=\"Raven\" style=\"height:45px; width:auto; margin-top:-12px;\" src=\"img/raven.png\">\n" +
    "      		</a>\n" +
    "      		<b class=\"navbar-brand\"><a href=\"{{baseURL}}\" style=\"color:black; hover:black; active:black\">Isle of Ravens</a></b>\n" +
    "        </div>\n" +
    "        <div id=\"navbar\" class=\"navbar-collapse collapse\" aria-expanded=\"false\" style=\"height: 1px;\">\n" +
    "          <ul class=\"nav navbar-nav navbar-right\">\n" +
    "            <li active-link=\"active\" link=\"{{baseURL}}\"><a href=\"{{baseURL}}\">Home</a></li>\n" +
    "			<li active-link=\"active\" link=\"{{baseURL}}faq\"><a href=\"{{baseURL}}faq\">FAQ</a></li>\n" +
    "			<li active-link=\"active\" link=\"{{baseURL}}whats-new\"><a href=\"{{baseURL}}whats-new\">What's New</a></li>\n" +
    "			<li active-link=\"active\" link=\"{{baseURL}}contact\"><a href=\"{{baseURL}}contact\">Contact</a></li>\n" +
    "          </ul>\n" +
    "        </div><!--/.nav-collapse -->\n" +
    "      </div>\n" +
    "</nav>\n" +
    "\n" +
    "\n" +
    "\n" +
    "<!--\n" +
    "<nav class=\"navbar navbar-default\">\n" +
    "	<div class=\"container-fluid\">\n" +
    "    	<div class=\"navbar-header\">\n" +
    "    		<h3 class=\"visible-xs pull-right\" style=\"margin-right:16px !important;\"><a href=\"{{baseURL}}\" style=\"color:black; hover:black; active:black\">Isle of Ravens</a></h3>\n" +
    "      		<a class=\"navbar-brand\" href=\"{{baseURL}}\">\n" +
    "        		<img alt=\"Raven\" style=\"height:45px; width:auto; margin-top:-6px;\" src=\"img/raven.png\">\n" +
    "      		</a>\n" +
    "    	</div>\n" +
    "	<div class=\"col-xs-8 hidden-xs\" style=\"padding-bottom:4px !important;\">\n" +
    "		<h2 style=\"margin-top:8px !important; margin-bottom:0px !important;\"><a href=\"{{baseURL}}\" style=\"color:black; hover:black; active:black\">Isle of Ravens</a></h2>\n" +
    "		<i class=\"hidden-xs text-center\" >Elo ranking and tournament details for AGoT LCG</i>\n" +
    "	</div>\n" +
    "  \n" +
    "  <div class=\"collapse navbar-collapse navbar-right\" id=\"bs-example-navbar-collapse-1\">\n" +
    "	<ul class=\"nav navbar-nav\">\n" +
    "		<li><a href=\"{{baseURL}}\" style=\"line-height:28px !important;\">Home</a></li>\n" +
    "		<li><a href=\"{{baseURL}}faq\" style=\"line-height:28px !important;\">FAQ</a></li>\n" +
    "		<li><a href=\"{{baseURL}}contact\" style=\"line-height:28px !important;\">Contact</a></li>\n" +
    "	</ul>\n" +
    "  </div>\n" +
    "  </div>\n" +
    "</nav>\n" +
    "-->\n" +
    "");
}]);

angular.module("js/player/faction_winloss.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("js/player/faction_winloss.html",
    "<div>\n" +
    "	<div class=\"col-xs-6\">\n" +
    "		<b>Win/Loss by Faction</b>\n" +
    "		<canvas id=\"fwl-{{player}}\"></canvas>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class=\"col-xs-4\">\n" +
    "		<b>Win Distribution</b>\n" +
    "		<div class=\"pie-group\">\n" +
    "		    <canvas id=\"wd-outter-{{player}}\" class=\"pie-1\" height=\"300\" width=\"300\"></canvas>\n" +
    "		    <canvas id=\"wd-{{player}}\" class=\"pie-2\" height=\"280\" width=\"280\"></canvas>\n" +
    "		</div>\n" +
    "		<div class=\"chartjs-tooltip\" id=\"wd-{{player}}-tooltip\">zxzx</div>\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("js/player/player_details.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("js/player/player_details.html",
    "<div>\n" +
    "	<div class=\"panel-heading\">\n" +
    "		<h2><a href=\"player/{{player.player_id}}\">{{player.name}}</a> ({{player.elo}})</h2>\n" +
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
    "   				<div class=\"col-xs-12\">\n" +
    "   					<span ng-if=\"player.name == 'Gabriel Saravia'\">90%!!!</span>\n" +
    "   					<span ng-if=\"player.name != 'Gabriel Saravia'\">{{ ((player.wins/(player.wins+player.losses))*100).toFixed(2) }}%</span>\n" +
    "   					\n" +
    "   				</div>\n" +
    "   			</div>\n" +
    "   		</div>\n" +
    "   		\n" +
    "   		<div class=\"row\">\n" +
    "   			<hr></hr>\n" +
    "   			<faction-winloss player=\"player.player_id\">Loading ...</faction-winloss>\n" +
    "   			<div class=\"clearfix\"></div>\n" +
    "   			<hr></hr>\n" +
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
    "				<td>{{$index+1+pagination.offset}}</td>\n" +
    "				<td><a href=\"player/{{player.player_id}}\">{{player.name}}</a></td>\n" +
    "				<td>{{player.elo}}</td>\n" +
    "				<td>{{player.wins}}</td>\n" +
    "				<td>{{player.losses}}</td>\n" +
    "				<td>{{player.entries}}</td>\n" +
    "				<td>{{player.most_played_faction}}</td>\n" +
    "			</tr>\n" +
    "		</tbody>\n" +
    "	</table>\n" +
    "	<div class=\"text-center\">\n" +
    "		<ul ng-if=\"pagination.total\" uib-pagination total-items=\"pagination.total\" items-per-page=\"20\" ng-model=\"pagination.page\" max-size=\"10\" ng-change=\"changePage()\" class=\"pagination-sm\" boundary-link-numbers=\"true\"></ul>\n" +
    "	</div>\n" +
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
    "<div class=\"clearfix\"></div>\n" +
    "\n" +
    "\n" +
    "<div ng-if=\"loading\">Loading...</div>\n" +
    "\n" +
    "<div ng-if=\"players.length <= 0 && !loading\" class=\"col-xs-12 col-md-12\">\n" +
    "	<top-players page=\"page\">Loading...</top-players>\n" +
    "</div>\n" +
    "\n" +
    "<div ng-if=\"players.length > 0 && !loading\">\n" +
    "	<div ng-repeat=\"player in players\">\n" +
    "		<div class=\"panel panel-default\">\n" +
    "			<player-details player=\"player\"></player-details>\n" +
    "		</div>\n" +
    "		<br/>\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("js/search/search_form.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("js/search/search_form.tpl.html",
    "<div class=\"row\">\n" +
    "	<div class=\"text-right\">\n" +
    "		<form class=\"form-inline\">\n" +
    "		  <div class=\"form-group\">\n" +
    "		      <input type=\"text\" class=\"form-control\" id=\"playerSearch\" name=\"name\" placeholder=\"Player Name\" ng-model=\"ps.search_str\" />\n" +
    "		  </div>\n" +
    "		  <button ng-click=\"searchPlayer()\" class=\"btn btn-small btn-default\">Search</button>\n" +
    "		</form>\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("js/search/search.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("js/search/search.html",
    "<style>\n" +
    "[data-toggle=\"collapse\"].collapsed .if-not-collapsed {\n" +
    "  display: none;\n" +
    "}\n" +
    "[data-toggle=\"collapse\"]:not(.collapsed) .if-collapsed {\n" +
    "  display: none;\n" +
    "}\n" +
    "</style>\n" +
    "\n" +
    "<div ng-if=\"loading\">Loading...</div>\n" +
    "\n" +
    "<div ng-if=\"ps.players.length > 0 && !loading\">\n" +
    "	\n" +
    "		<div ng-repeat=\"player in ps.players\">\n" +
    "			<div class=\"panel panel-default\">\n" +
    "				<player-details player=\"player\"></player-details>\n" +
    "			</div>\n" +
    "			<br/>\n" +
    "		</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("js/whatsnew/whatsnew.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("js/whatsnew/whatsnew.html",
    "<div class=\"panel-group\" id=\"accordion\">\n" +
    "	<div class=\"panel panel-default\" ng-repeat=\"u in updates\">\n" +
    "		<div class=\"panel-heading\">\n" +
    "			<h4 class=\"panel-title\">\n" +
    "				<a class=\"accordion-toggle\" ng-class=\"$index!=0?'collapsed':''\" href=\"javascript:void(0);\" data-toggle=\"collapse\" data-parent=\"#accordion\" data-target=\"#collapse{{u.date}}\" aria-expanded=\"false\">{{u.date}}</a>\n" +
    "			</h4>\n" +
    "		</div>\n" +
    "		<div id=\"collapse{{u.date}}\" class=\"panel-collapse collapse\"  ng-class=\"$index!=0?'':'in'\" aria-expanded=\"false\">\n" +
    "			<div class=\"panel-body\">\n" +
    "				<div ng-bind-html=\"toTrustedHTML(u.update)\"></div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>");
}]);
