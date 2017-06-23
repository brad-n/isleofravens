app.directive('playerSearch',
		['Restangular', '$routeParams', '$route', '$location', '$q', 'Api', 'PlayerSearch',
			function (Rest, $routeParams, $route, $location, $q, Api, PlayerSearch) {
        'use strict';

        return {
            restrict: 'EA',
            replace: true,
            transclude: false,
            templateUrl: 'js/search/search_form.tpl.html',
            scope: {
                page: '=',
                mode: '&'
            }, 
            link : function(scope, elem, attrs){
            	
            	console.log("IN PLAYER SEARCH DIRECTIVE!!!!");
            	
            	scope.ps = PlayerSearch;
            	scope.pagination = {offset:0, limit:20, page:scope.page}
            	scope.loaded = false;
            	
            	scope.searchPlayer = function(){
            		
            		console.log("search player!");
            		
            		scope.ps.searchPlayers().then(function(){
            			
            			$location.path( "/search");
            		});
            		
            		
            	}
            	
            	if(scope.ps.search_str){
            		scope.searchPlayer();
            	}
            	
            }
        }
    }]);
