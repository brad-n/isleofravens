app.directive('playerDetails',
    [function () {
        'use strict';

        return {
            restrict: 'EA',
            replace: true,
            transclude: false,
            templateUrl: 'js/player/player_details.html',
            scope: {
                player: '=',
                mode: '&'
            }
        };
    }]);
