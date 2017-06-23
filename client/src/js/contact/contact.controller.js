var ContactCtrl = app.controller('ContactController',
['$scope', 'Restangular', '$routeParams', '$route', '$location', '$q', 'Api', '$sce', '$http',
function ($scope, Rest, $routeParams, $route, $location, $q, Api, $sce, $http) {
  $scope.success = false;
  $scope.error = false;
  $scope.sending = false;
  $scope.user = {};
  
  $scope.send = function () {

	  $scope.sending = true;
	  
	  Api.sendMail($scope.user).then(function(res){
		  console.log(res);
		  console.log($scope.user);
		  $scope.success = true;
		  $scope.error = false;
	  }, function(response) {
		  $scope.error = true;
		  $scope.success = false;
		  console.log("Error with status code", response.status);
	  });
	  
  }
}])