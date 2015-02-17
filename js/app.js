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
  		when('/ngTable', {
    		templateUrl: 'partials/main.html'
  		}).
  		otherwise({
    		redirectTo: '/ngTable'
  	});
}]);

//Run
expHandsonTable.run(function($log){
	$log.debug("test debug");
});


