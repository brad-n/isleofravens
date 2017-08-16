var app = angular.module('isleOfRavensApp', ['ngRoute', 'restangular', 'templates-main', 'ui.bootstrap','angularModalService']);

app.run(['$rootScope', function(rs){
	rs.baseURL = cfg.baseHref;
}])

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    'use strict';
    $locationProvider.html5Mode(true);
    $routeProvider

	    .when("/", {
	    	templateUrl: "js/search/main.html",
	        controller: 'MainController',
	    })
	    .when("/search", {
	    	templateUrl: "js/search/search.html",
	        controller: 'SearchController',
	    })
	    .when("/page/:page", {
	    	templateUrl: "js/search/main.html",
	        controller: 'MainController',
	    })
	    .when("/player/:playerID", {
	    	templateUrl: "js/search/main.html",
	        controller: 'MainController',
	    })
	    .when("/stats", {
	    	templateUrl: "js/stats/stats.html",
	        controller: 'MainController',
	    })
	    .when("/faq", {
	    	templateUrl: "js/faq/faq.html",
	        controller: 'FaqController',
	    })
	    .when("/contact", {
	    	templateUrl: "js/contact/contact.html",
	    	controller: 'ContactController',
	    })
	    .when("/whats-new", {
	    	templateUrl: "js/whatsnew/whatsnew.html",
	    	controller: 'WhatsNewController',
	    })
        .otherwise({redirectTo: "/"});
}])

.run(['Restangular', '$rootScope',
	function (RestProvider, rs) {
		'use strict';
		RestProvider
			.setBaseUrl(cfg.apiBaseUrl())
}])
