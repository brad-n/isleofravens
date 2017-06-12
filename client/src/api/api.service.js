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
			}

		};
	}
]);
