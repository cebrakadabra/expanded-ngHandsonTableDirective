expHandsonTable.controller('MainCtrl', ['$scope', '$location', function ($scope, $location) {

	$scope.goTo = function(path){
		$location.path( path );
	};

}]);


expHandsonTable.controller('handsonFullCtrl', ['$scope', '$location', '$timeout', function ($scope, $location, $timeout) {

	$scope.items = [];

	$scope.items = [
		{
			id: 1,
			name: "Chris",
			address: "Patternstreet",
			number: "17",
			array: ["a", "b", "c"],
			object: [
				{
					id: 1,
					name: "Object 1",
					animal: "Cat",
					food: ["whiskas", "sheba"]
				},
				{
					id: 2,
					name: "Object 2",
					animal: "Dog"
				}
			]
		},
		{
			id: 2,
			name: "Peter",
			address: "Patternstreet",
			number: "20",
			array: ["a", "b", "c", "d"],
			object: [
				{
					test: "hello you 2",
					name: "succeeded"
				}
			]

		},
		{
			id: 3,
			name: "Sandra",
			address: "Patternstreet",
			number: "21",
			array: ["a", "b"],
			object: [
				{
					test: "hello you 3"
				}
			]
		}
	];

	$scope.headertitles = ["ID", "Name", "Address", "Street number", "Items", "Object"];
	// $scope.params = ["id", "name", "address", "number", "array", "object"];

	$timeout(function(){
		$scope.items.push({
			id: 4,
			name: "Sandra2",
			address: "Patternstreet",
			number: "21",
			array: ["a", "b"],
			object: [
				{
					test: "hello you 4"
				}
			]
		});
		console.log("data added");
	}, 1000);

}]);
