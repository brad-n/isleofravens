var MainCtrl = app.controller('MatchupDetailsController',
['$scope', 'params', 'close','Api',
function ($scope, params, close, Api) {
	
	$scope.params = params;
	$scope.matches = {};
	
	$scope.loadMatchupDetails = function(){
		
		Api.loadFactionMatchupDetails($scope.params).then(function(res){
			$scope.matches = res.data;
		})
		
	}
	
	
	$scope.close = function(result) {
		close(null, 500); // close, but give 500ms for bootstrap to animate
	};
	
	$scope.loadMatchupDetails();
	
	
}]);
