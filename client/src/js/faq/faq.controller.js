var FaqCtrl = app.controller('FaqController',
['$scope', 'Restangular', '$routeParams', '$route', '$location', '$q', 'Api', '$sce',
function ($scope, Rest, $routeParams, $route, $location, $q, Api, $sce) {
	
	$scope.loading = false;
	
	$scope.faqs = [
		{id:1, q:"What is Isle of Ravens?", a:"Isle of Ravens is a site that collects tournament entries for A Game of Thrones LCG 2nd edition and generates an Elo rating for each player based on their performance.  Data is sourced from <a href=\"http://thejoustingpavilion.com\" target=\"_blank\">The Jousting Pavilion</a> and fetches new results hourly.  Due to API limitations, we can only pull in data for completed tournaments."},
		{id:2, q:"What is an Elo Rating", a:"Officially, 'The Elo rating system is a method for calculating the relative skill levels of players in competitor-versus-competitor games such as chess. It is named after its creator Arpad Elo, a Hungarian-born American physics professor.'"},
		{id:3, q:"Where does this data come from and how often is it updated?", a:"IoR will check for new entries on <a href=\"http://thejoustingpavilion.com\" target=\"_blank\">The Jousting Pavilion</a> every hour and generate updated Elo ratings based on the new results.  At this time we can only pull in data for completed tournaments, so your Elo will not updated until the end of an event."},
		{id:4, q:"I had my name merged on TJP, when will my Elo update?", a:"You will have to notify us when a historical change happens.  Because a single change in a player or tournament ripples through the data, effecting an increasingly branching set of Elo ratings, we have to re-run all of the data.  To be kind to the data sources we rely on, this is only done per request and not automatically."},
		{id:5, q:"I had a tournament for a different game deleted from TJP, when will my Elo Update?", a:"You will have to notify us when a historical change happens.  Because a single change in a player or tournament ripples through the data, effecting an increasingly branching set of Elo ratings, we have to re-run all of the data.  To be kind to the data sources we rely on, this is only done per request and not automatically."},
		{id:6, q:"Why did tournament X not affect my Elo?", a:"Elo ratings depend on round by round data being available.  If this there are no rounds available, we can't calculate a new Elo."},
	]

	$scope.toTrustedHTML = function (html) {
		return $sce.trustAsHtml(html);
	};
	
}]);
