app.directive('topPlayers',
    ['Api', function (Api) {
        'use strict';

        return {
            restrict: 'EA',
            replace: true,
            transclude: false,
            templateUrl: 'js/player/top_players.html',
            scope: {
                count: '=',
                mode: '&'
            }, 
            link : function(scope, elem, attrs){
            	
            	scope.loadTopPlayers = function(topX){
            		Api.loadTopPlayers(topX).then(function(res){
            			scope.top_players = res.data;
            			console.log(scope.top_players);
            		})
            	}
            	
            	if(!scope.count){
            		scope.count = 25;
            	}
            	
            	scope.loadTopPlayers(scope.count);
            	
            }
        }
    }]);
