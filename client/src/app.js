var app = angular.module('isleOfRavensApp',
  ['ngRoute', 'restangular']);

app.run(['$rootScope', function(rs){
	rs.baseURL = cfg.baseHref;
}])

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    'use strict';
    //$locationProvider.html5Mode(true);
    $routeProvider

	    .when("/", {
	    	templateUrl: "src/search/main.html",
	        controller: 'MainController',
	    })
	    .when("/player/:playerID", {
	    	templateUrl: "src/search/main.html",
	        controller: 'MainController',
	    })
        .otherwise({redirectTo: "/"});
}])

.run(['Restangular', '$rootScope',
	function (RestProvider, rs) {
		'use strict';
		RestProvider
			.setBaseUrl(cfg.apiBaseUrl())
}])
