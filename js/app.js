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
			when('/handsonFull', {
    		templateUrl: 'partials/handsonFull.html',
				controller: 'handsonFullCtrl'
  		}).
  		otherwise({
    		redirectTo: '/handsonFull'
  	});
}]);

//Run
expHandsonTable.run(function($log){
	$log.debug("test debug");
});
