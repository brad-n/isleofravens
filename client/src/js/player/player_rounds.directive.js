app.directive('playerRounds',
    ['Api', function (Api) {
        'use strict';

        return {
            restrict: 'EA',
            replace: true,
            transclude: false,
            templateUrl: 'js/player/player_rounds.html',
            scope: {
            	tid: '=',
            	player: '=',
                mode: '&'
            },
            link: function(scope, element, attrs){
            	scope.loadPlayerRounds = function(){
            		console.log('loading! - '+scope.tid+' -- '+scope.player.player_id);
            		Api.loadTournamentRoundsByPlayer(scope.tid, scope.player.player_id).then(function(res){
            			scope.rounds = res.data;
            			console.log(scope.tournaments);
            		});
            	}
            	
            	
            }
        };
    }]);
