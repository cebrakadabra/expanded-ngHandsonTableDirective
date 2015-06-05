expHandsonTable.controller('MainCtrl', ['$scope', '$location', function ($scope, $location) {

	$scope.goTo = function(path){
		$location.path( path );
	};

}]);


expHandsonTable.controller('handsonFullCtrl', ['$scope', '$location', '$timeout', 'DataService', function ($scope, $location, $timeout, DataService) {

	$scope.hiddenfields = [];
	$scope.hiddenfields = DataService.hiddenfields;

	$scope.items = [];
	$scope.items = DataService.datastructure;


	$timeout(function(){
		console.log("aksdjköasdsa");
		console.log($scope.hiddenfields);
	}, 3000);

	// $scope.headertitles = ["ID", "Name", "Address", "Street number", "Items", "Object"];
	// $scope.params = ["id", "name", "address", "number", "array", "object"];

	$timeout(function(){
		$scope.items.push({
			"id": 4,
			"name": "Sandra 4",
			"address": "Patternstreet",
			"number": "21",
			"array": ["a", "b", "c"],
			"object": [
				{
					"test": "hello you 4"
				}
			]
		});
		console.log("data added");
		
	}, 500);

	$timeout(function(){
		$scope.items.push({
			"id": 5,
			"name": "Sandra 5",
			"address": "Patternstreet",
			"number": "21",
			"array": ["a", "b", "c"],
			"object": [
				{
					"test": "hello you 4"
				}
			]
		});
		console.log("data added");
	}, 1000);

}]);
