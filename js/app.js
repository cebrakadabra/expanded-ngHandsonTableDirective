var expHandsonTable = angular.module("expHandsonTable", [
	'ngRoute', 
]);

//Configuration
expHandsonTable.config(function($logProvider){
	$logProvider.debugEnabled(false);
});


// Routing for the Views
expHandsonTable.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
  		when('/home', {
    		templateUrl: 'partials/main.html',
    		controller: 'MainCtrl'
  		}).
  		otherwise({
    		redirectTo: '/home'
  	});
}]);

//Run
expHandsonTable.run(function($log){
	$log.debug("test debug");
});


