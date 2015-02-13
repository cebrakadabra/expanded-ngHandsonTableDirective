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



	// json structure example
	// ******************************************************
	$scope.ex.structure = [];
	$scope.ex.configcols = {};

	$scope.ex.configcols = {
		col1_title: "ID",
		col2_title: "First Name",
		col3_title: "Last Name",
		col4_title: "Children",
		col5_title: "Animals",
		col6_title: "Age"
	};

	$scope.ex.structure = [
		{
			id: 1,
			name: {
				first: "John",
				last: "Doe"
			},
			children: {
				sum: 0,
				names: []
			},
			animals: {
				sum: 6,
				types: [{type: "cat"}, {type: "crocodile"}, {type: "dog"}, {type: "cat"}, {type: "bird"}, {type: "fish"}]
			},
			age: 43
		},
		{
			id: 2,
			name: {
				first: "Johanna",
				last: "Mustard",
			},
			children: {
				sum: 2,
				names: [{name: "Valerie"}, {name: "Steve"}]
			},
			animals: {
				sum: 6,
				types: [{type: "cat"}, {type: "crocodile"}, {type: "dog"}, {type: "cat"}, {type: "bird"}, {type: "fish"}]
			},
			age: 44
		}
			
	];


	// *******************************************************


	// PARSE THE CUSTOM JSON STRUCTURE
	// *******************************************************	
	$scope.persondata = [];
	for(var i = 0; i < $scope.ex.structure.length; i++){
		var input = {};
		input.children = {};
		input.animals = {};

		input.id = $scope.ex.structure[i].id;
		input.firstname = $scope.ex.structure[i].name.first;
		input.lastname = $scope.ex.structure[i].name.last;
		input.fullname = input.firstname + " " + input.lastname;
		input.age = $scope.ex.structure[i].age;
		
		// Check if children --> breadcrumb
		if($scope.ex.structure[i].children.sum != 0){
			input.children.bool = true;
			input.children.sum = $scope.ex.structure[i].children.sum;
			input.children.childrennames = [];
			for(var x = 0; x < $scope.ex.structure[i].children.names.length; x++){
				input.children.childrennames.push({name: $scope.ex.structure[i].children.names[x].name});
			}
			console.log(input.animals.animaltypes);
		} else{
			input.children.bool = false;
		}

		// Check if animals --> breadcrumb
		if($scope.ex.structure[i].animals.sum != 0){
			input.animals.bool = true;
			input.animals.sum = $scope.ex.structure[i].animals.sum;
			input.animals.animaltypes = [];
			for(var x = 0; x < $scope.ex.structure[i].animals.types.length; x++){
				input.animals.animaltypes.push({type: $scope.ex.structure[i].animals.types[x].type});
			}
		} else{
			input.animals.bool = false;
		}

		$scope.persondata.push(input);
	}



}]);