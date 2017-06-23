app.directive('topPlayers',
		['Restangular', '$routeParams', '$route', '$location', '$q', 'Api',
			function (Rest, $routeParams, $route, $location, $q, Api) {
        'use strict';

        return {
            restrict: 'EA',
            replace: true,
            transclude: false,
            templateUrl: 'js/player/top_players.html',
            scope: {
                page: '=',
                mode: '&'
            }, 
            link : function(scope, elem, attrs){
            	
            	scope.pagination = {offset:0, limit:20, page:scope.page}
            	scope.loaded = false;
            	
            	scope.loadTopPlayers = function(){

            		scope.pagination.offset = scope.pagination.limit * (scope.pagination.page - 1);
            		
            		Api.loadTopPlayers(scope.pagination).then(function(res){
            			scope.top_players = res.data.players;
            			scope.pagination.total = res.data.total.total;
            			scope.pagination.page = (scope.pagination.offset / scope.pagination.limit)+1
            		})
            	}
            	
            	scope.changePage = function(){
            		$location.path( "/page/"+scope.pagination.page );
            	}
            	
            	scope.loadTopPlayers();
            	
            }
        }
    }]);
