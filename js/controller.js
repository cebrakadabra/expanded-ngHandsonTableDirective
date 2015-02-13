expHandsonTable.controller('DemoCtrl', ['$scope', function ($scope) {


	$scope.minSpareRows = 0;
	$scope.colHeaders = true;

	




	$scope.ex = {};
	// plain js object
	// ******************************************************

	$scope.ex.jsobject = {
		id: 1,
		name: {
			first: "John",
			last: "Doe"
		},
		children: 0,
		engaged: 'No'
	};

	// *******************************************************



	// js array
	// ******************************************************
	$scope.ex.jsarray = [];
	var animals = ["cat", "dog", "crocodile", "fox"];
	for(var i = 0; i < animals.length; i++){
		$scope.ex.jsarray.push({animal: animals[i]});
	}


	// *******************************************************



	// js value
	// ******************************************************
	$scope.ex.value = {
		value: 10
	};


	// *******************************************************



}]);