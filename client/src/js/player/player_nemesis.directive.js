app.directive('playerNemesis',
    [function () {
        'use strict';

        return {
            restrict: 'EA',
            replace: true,
            transclude: false,
            templateUrl: 'js/player/player_nemesis.html',
            scope: {
                player: '=',
                mode: '&'
            }
        };
    }]);
