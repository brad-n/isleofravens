var MainCtrl = app.controller('SearchController',
['$scope', 'Restangular', '$routeParams', '$route', '$location', '$q', 'Api', 'PlayerSearch',
function ($scope, Rest, $routeParams, $route, $location, $q, Api, PlayerSearch) {
	
	$scope.ps = PlayerSearch;
	$scope.players = $scope.ps.players;
	$scope.loading = false;

	
	
}]);
