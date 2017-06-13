app.directive('playerTournaments',
    ['Api', function (Api) {
        'use strict';

        return {
            restrict: 'EA',
            replace: true,
            transclude: false,
            templateUrl: 'js/player/player_tournaments.html',
            scope: {
                player: '=',
                mode: '&'
            },
            link: function(scope, element, attrs){
            	
            	
            	scope.loadPlayerTournaments = function(){
            		console.log('loading!');
            		Api.loadTournamentsByPlayer(scope.player.player_id).then(function(res){
            			scope.tournaments = res.data;
            			console.log(scope.tournaments);
            		});
            	}
            	
            	
            }
        };
    }]);
