app.directive('playerRival',
    [function () {
        'use strict';

        return {
            restrict: 'EA',
            replace: true,
            transclude: false,
            templateUrl: 'js/player/player_rival.html',
            scope: {
                player: '=',
                mode: '&'
            }
        };
    }]);
