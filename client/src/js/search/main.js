var MainCtrl = app.controller('MainController',
['$scope', 'Restangular', '$routeParams', '$route', '$location', '$q', 'Api',
function ($scope, Rest, $routeParams, $route, $location, $q, Api) {
	
	$scope.search_str = '';
	$scope.players = [];
	$scope.top_players = [];
	$scope.loading = false;
	
	$scope.searchPlayer = function(){
		$scope.loading = true;
		Api.searchPlayers({playerName:$scope.search_str}).then(function(res){
			$scope.players = res.data;
			console.log($scope.players);
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
	
	$scope.loadTopPlayers = function(topX){
		Api.loadTopPlayers(topX).then(function(res){
			$scope.top_players = res.data;
			console.log($scope.top_players);
		})
	}
	
	if($routeParams.playerID){
		$scope.loadPlayer($routeParams.playerID);
	}else{
		//$scope.loadTopPlayers(25);
	}
	
	
}]);
