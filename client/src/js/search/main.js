var MainCtrl = app.controller('MainController',
['$scope', 'Restangular', '$routeParams', '$route', '$location', '$q', 'Api', 'PlayerSearch',
function ($scope, Rest, $routeParams, $route, $location, $q, Api, PlayerSearch) {
	
	$scope.search_str = '';
	$scope.players = [];
	$scope.top_players = [];
	$scope.loading = false;
	
	$scope.page = 1;
	
	if($routeParams.page){
		$scope.page = $routeParams.page;
	}
	
	$scope.loadPlayer = function(id){
		$scope.loading = true;
		Api.loadPlayerByID(id).then(function(res){
			$scope.players.push(res.data);
			$scope.loading = false;
		});
	}
	
	
	if($routeParams.playerID){
		$scope.loadPlayer($routeParams.playerID);
	}
	
	
}]);
