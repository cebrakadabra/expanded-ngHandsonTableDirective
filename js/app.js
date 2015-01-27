var exHandson = angular.module("expandedHandsontable", [
  'ngRoute', 
  'ngAnimate'
]);

//Configuration
exHandson.config(function($logProvider){
	$logProvider.debugEnabled(false);
});


// Routing for the Views
exHandson.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
  		when('/home', {
    		templateUrl: 'partials/main.html',
    		controller: 'MainController'
  		}).
  		otherwise({
    		redirectTo: '/home'
  	});
}]);

//Run
exHandson.run(function($log){
	$log.debug("test debug");
});


