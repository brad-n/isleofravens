var FaqCtrl = app.controller('WhatsNewController',
['$scope', 'Restangular', '$routeParams', '$route', '$location', '$q', 'Api', '$sce',
function ($scope, Rest, $routeParams, $route, $location, $q, Api, $sce) {
	
	$scope.loading = false;
	
	$scope.updates = [
		{
			date:'2017-08-01',
			update:"<ol>" +
					"<li>Fixed an issue with the data processor.  This was causing game results to lock in a loop and get recorded multiple times.</li>" +
					"<li>Pulled a fresh data set to fix errors from above and catch the latest name changes/merges.</li>" +
					"<li>Added additional information to the backend for some cool future features involving pulling stats.</li>" +
					"<li>Added a stats page to show some general stats (right now it's just faction entries YTD).</li>" +
					"</ol>"
					
		},
		{
			date:'2017-06-18',
			update:"<ol>" +
					"<li>Added pagination for top players, allowing seeing all players in the system</li>" +
					"<li>Changed how the search functions, now redirects to it's own page.</li>" +
					"<li>Search is now available from all pages.</li>" +
					"<li>Optomized UI layout.</li>" +
					"<li>Replaced google charts with charts.js.  More flexible and optomized for our purposes</li>" +
					"<li>Updated to material design elements.</li>" +
					"<li>Added 'What's new' page.</li>" +
					"<li>Fixed overflow issue with 'FAQ' and 'What's New' pages on initial load.</li>" +
					"</ol>"
					
		},
		{
			date:'2017-06-16',
			update:"<ol>" +
					"<li>Re-pulled all data to account for TJP name merges.</li>" +
					"<li>Added FAQ & Contact pages</li>" +
					"<li>Added player faction stats graph to player cards</li>" +
					"</ol>"
		}
	]

	$scope.toTrustedHTML = function (html) {
		return $sce.trustAsHtml(html);
	};
	
}]);
