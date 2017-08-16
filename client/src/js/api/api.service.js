app.factory('Api', ['Restangular', '$rootScope', '$q', '$location', '$http',
	function (Rest, $rootScope, $q, $location, $http) {
		'use strict';
		window.Api = this;
		var initData = {};
		var sendEvt = function (id, obj) {
			$rootScope.$broadcast(id, obj);
		};


		return {
			searchPlayers: function (opts) {
				return Rest.all('player/search/').post(opts);
			},
			loadPlayerByID: function(playerID){
				return Rest.one('player/'+playerID).get(playerID);
			},
			loadTopPlayers: function(opts){
				return Rest.all('player/top/?offset='+opts.offset+'&limit='+opts.limit).get('');
			},
			loadTournamentsByPlayer: function(player_id){
				return Rest.all('player/tournaments/').get(player_id);
			},
			loadTournamentRoundsByPlayer: function(tournament_id, player_id){
				return Rest.all('tournament/rounds/'+tournament_id+'/').get(player_id);
			},
			loadFactionWinLoss : function(playerID){
				return Rest.one('player/faction/winloss/'+playerID).get(playerID);
			},
			loadFactionEntries : function(){
				return Rest.all('stats/factions/entries/').get('');
			},
			loadFactionWins : function(){
				return Rest.all('stats/factions/wins/').get('');
			},
			loadFactionMatchups : function(opts){
				return Rest.all('stats/faction/matchups/').post(opts);
			},
			loadFactionMatchupDetails : function(opts){
				return Rest.all('stats/faction/matchup_details/').post(opts);
			},
			loadFactions : function(){
				return Rest.all('factions/').get('');
			},
			
			sendMail : function(opts){
				console.log('api : ');
				console.log(opts);
				return Rest.all('send-mail/').post(opts);
			}

		};
	}
]);
