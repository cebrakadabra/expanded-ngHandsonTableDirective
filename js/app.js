var expHandsonTable = angular.module("expHandsonTable", [
]);

//Configuration
expHandsonTable.config(function($logProvider){
	$logProvider.debugEnabled(false);
});


// Routing for the Views
// expHandsonTable.config(['$routeProvider', function($routeProvider) {
// 	$routeProvider.
//   		when('/home', {
//     		templateUrl: 'partials/main.html',
//     		controller: 'MainController'
//   		}).
//   		otherwise({
//     		redirectTo: '/home'
//   	});
// }]);

//Run
expHandsonTable.run(function($log){
	$log.debug("test debug");
});


