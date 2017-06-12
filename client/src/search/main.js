var MainCtrl = app.controller('MainController',
['$scope', 'Restangular', '$routeParams', '$route', '$location', '$q', 'Api',
function ($scope, Rest, $routeParams, $route, $location, $q, Api) {
	
	$scope.search_str = '';
	$scope.players = [];
	$scope.loading = false;
	
	$scope.searchPlayer = function(){
		$scope.loading = true;
		Api.searchPlayers({playerName:$scope.search_str}).then(function(res){
			$scope.players = res.data;
			$scope.loading = false;
		});
	}
	
	$scope.loadPlayer = function(id){
		$scope.loading = true;
		Api.loadPlayerByID(id).then(function(res){
			console.log(res.data);
			$scope.players.push(res.data);
			$scope.loading = false;
		});
		
	}
	
	
	if($routeParams.playerID){
		$scope.loadPlayer($routeParams.playerID);
	}
	
	
}]);
