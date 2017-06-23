app.factory('PlayerSearch', ['Restangular', '$rootScope', '$q', '$location', '$http', 'Api',
	function (Rest, $rootScope, $q, $location, $http, Api) {
		'use strict';
		window.Api = this;
		var initData = {};
		var players = {};
		var search_str = '';
		var sendEvt = function (id, obj) {
			$rootScope.$broadcast(id, obj);
		};


		return {

			setSearchStr: function(search_str){
				console.log('setting search str : '+search_str);
				this.search_str = search_str;
				console.log('after setting?');
				console.log(this.search_str);
			},

			searchPlayers: function(){
				var that = this;
				var defer = $q.defer();
				Api.searchPlayers({playerName:that.search_str}).then(function(res){
					console.log('returning with that.players??');
					that.players = res.data;
					console.log(that.players);
					defer.resolve(res.data);
				},function (err) { defer.reject(err)});
				
				return defer.promise;
			}
			

		};
	}
]);
