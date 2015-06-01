expHandsonTable.controller('MainCtrl', ['$scope', '$location', function ($scope, $location) {

	$scope.goTo = function(path){
		$location.path( path );
	};

}]);


expHandsonTable.controller('handsonFullCtrl', ['$scope', '$location', '$timeout', 'DataService', function ($scope, $location, $timeout, DataService) {

	$scope.items = [];
	$scope.items = DataService.datastructure;
	$timeout(function(){
		console.log($scope.items);
	}, 4000);

	// $scope.headertitles = ["ID", "Name", "Address", "Street number", "Items", "Object"];
	// $scope.params = ["id", "name", "address", "number", "array", "object"];

	// $timeout(function(){
		// $scope.items.push({
		// 	"id": 4,
		// 	"name": "Sandra2",
		// 	"address": "Patternstreet",
		// 	"number": "21",
		// 	"array": ["a", "b"],
		// 	"object": [
		// 		{
		// 			"test": "hello you 4"
		// 		}
		// 	]
		// },
		// {
		// 	"id": 5,
		// 	"name": "Sandra3",
		// 	"address": "Patternstreet",
		// 	"number": "21",
		// 	"array": ["a", "b"],
		// 	"object": [
		// 		{
		// 			"test": "hello you 5"
		// 		}
		// 	]
		// });
		// console.log("data added");
		// console.log($scope.items);
	// }, 1000);


	// $timeout(function(){
	// 	console.log($scope.items);
	// }, 10000);

}]);
