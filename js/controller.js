expHandsonTable.controller('MainCtrl', ['$scope', function ($scope) {


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
			title: 'Person 1',
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
			title: 'Person 2',
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





	/* 
	***************************************************************
						DYNAMIC COLUMN SETTING
	***************************************************************
	*/
	// var products = [
	// 	{
	// 		"description": "Big Mac",
	// 		"options": [
	// 			{"description": "Big Mac", "image": "//a248.e.akamai.net/assets.github.com/images/icons/emoji/hamburger.png", Pick$: null},
	// 			{"description": "Big Mac & Co", "image": "//a248.e.akamai.net/assets.github.com/images/icons/emoji/hamburger.png", Pick$: null},
	// 			{"description": "McRoyal", "image": "//a248.e.akamai.net/assets.github.com/images/icons/emoji/hamburger.png", Pick$: null},
	// 			{"description": "Hamburger", "image": "//a248.e.akamai.net/assets.github.com/images/icons/emoji/hamburger.png", Pick$: null},
	// 			{"description": "Cheeseburger", "image": "//a248.e.akamai.net/assets.github.com/images/icons/emoji/hamburger.png", Pick$: null},
	// 			{"description": "Double Cheeseburger", "image": "//a248.e.akamai.net/assets.github.com/images/icons/emoji/hamburger.png", Pick$: null}
	// 		]
	// 	},
	// 	{
	// 		"description": "Fried Potatoes",
	// 		"options": [
	// 			{"description": "Fried Potatoes", "image": "//a248.e.akamai.net/assets.github.com/images/icons/emoji/fries.png", Pick$: null},
	// 			{"description": "Fried Onions", "image": "//a248.e.akamai.net/assets.github.com/images/icons/emoji/fries.png", Pick$: null}
	// 		]
	// 	}
	// ];
	// var firstNames = ["Ted", "John", "Macy", "Rob", "Gwen", "Fiona", "Mario", "Ben", "Kate", "Kevin", "Thomas", "Frank"];
	// var lastNames = ["Tired", "Johnson", "Moore", "Rocket", "Goodman", "Farewell", "Manson", "Bentley", "Kowalski", "Schmidt", "Tucker", "Fancy"];
	// var address = ["Turkey", "Japan", "Michigan", "Russia", "Greece", "France", "USA", "Germany", "Sweden", "Denmark", "Poland", "Belgium"];


	$scope.db = {};
	// $scope.db.items = [];
	// for (var i = 0; i < 10; i++) {
	// 	$scope.db.items.push(
	// 		{
	// 			id: i + 1,
	// 			name: {
	// 				first: firstNames[Math.floor(Math.random() * firstNames.length)],
	// 				last: lastNames[Math.floor(Math.random() * lastNames.length)]
	// 			},
	// 			address: Math.floor(Math.random() * 100000) + ' ' + address[Math.floor(Math.random() * address.length)],
	// 			price: Math.floor(Math.random() * 100000) / 100,
	// 			isActive: Math.floor(Math.random() * products.length) / 2 == 0 ? 'Yes' : 'No',
	// 			product: angular.extend({}, products[Math.floor(Math.random() * products.length)])
	// 		}
	// 	);
	// }


	// $scope.db.dynamicConfig = [
	// 	{
	// 		data: 'id',
	// 		title: 'ID'
	// 	},
	// 	{
	// 		data: 'name.first',
	// 		title: 'First Name',
	// 		readOnly: true
	// 	},
	// 	{
	// 		data: 'name.last',
	// 		title: 'Last Name',
	// 		readOnly: true
	// 	},
	// 	{
	// 		data: 'address', 
	// 		title: 'Address', 
	// 		width: 150
	// 	},
	// 	{
	// 		data: 'product.description', 
	// 		type: 'autocomplete', 
	// 		title: 'Favorite food', 
	// 		width: 150, 
	// 		optionList: 'description in product.options'
	// 	},
	// 	{
	// 		data: 'price', 
	// 		title:'Price', 
	// 		type: 'numeric', 
	// 		width: 80, 
	// 		format: '$ 0,0.00'
	// 	},
	// 	{
	// 		data: 'isActive', 
	// 		type: 'checkbox', 
	// 		title: 'Is active', 
	// 		checkedTemplate: 'Yes', 
	// 		uncheckedTemplate: 'No', 
	// 		width:65
	// 	}
	// ];

// 	setInterval(function () {
// 		if( $scope.db.dynamicConfig[0].title == 'ID') {
// 			$scope.db.dynamicConfig[3].readOnly = true;
// 			$scope.db.dynamicConfig.shift();
// 			$scope.afterChange = function () {
// //							console.log('afterChange: ','when ID column has been removed');
// 			};

// 		} else {
// 			$scope.db.dynamicConfig[2].readOnly = false;
// 			$scope.db.dynamicConfig.unshift({data: 'id', title: 'ID'});
// 			$scope.afterChange = function () {
// //							console.log('afterChange: ','when ID column has been added');
// 			};
// 		}



// 		$scope.$apply();
// 	}, 3000);



	/*
		*****************************************************************************************
			Try to accomplish dynamic column setting in combination with breadcrumbs
		*****************************************************************************************
	*/
	$scope.db.dynrows = [];
	$scope.db.dyncols = [];
	$scope.breadcrumbs = [];
	$scope.configTable = {
		height: null,
		width: null
	}

	$scope.initData = function(){
		// console.log("init Data function");
		$scope.db.dyncols.push(
			{
				data: 'id', 
				title: 'ID'
			}, 
			{
				data: 'name.first',
				title: 'First Name'
			},
			{
				data: 'name.last',
				title: 'Last Name'
			},
			{
				data: 'children.sum',
				title: 'Children'
			},
			{
				data: 'animals.sum',
				title: 'Animals'
			},
			{
				data: 'age',
				title: 'Age'
			}
		);

		for(var i = 0; i < $scope.ex.structure.length; i++){
			$scope.breadcrumbs.push({title: $scope.ex.structure[i].title, id: $scope.ex.structure[i].id, opacity: 1});
			$scope.db.dynrows.push($scope.ex.structure[i]);

			if($scope.ex.structure[i].children.length > 0){
				console.log("has children");
			} else{
				
			}
		}

		var datalength = $scope.ex.structure.length;
		$scope.configTable.height = 30 + 30*datalength;
		$scope.configTable.width = $("#tablediv").width();
		// console.log($scope.breadcrumbs);

	};

	$scope.initData();

	



	$scope.clickBreadcrum = function(breadcrumb){
		$scope.db.dynrows.length = 0;
		// $scope.db.dyncols.length = 0;

		if(breadcrumb == 'root'){
			$scope.db.dynrows.length = 0;
			$scope.db.dyncols.length = 0;
			$scope.breadcrumbs = [];
			$("#path").text("");
			$scope.initData();
		} else{

			for(var i = 0; i < $scope.ex.structure.length; i++){
				if($scope.ex.structure[i].id == breadcrumb){
					$scope.db.dynrows.push($scope.ex.structure[i]);
					$scope.breadcrumbs[i].opacity = 0;
					$("#path").append(" > <span>" +$scope.ex.structure[i].title+ "</span>");
				} else if($scope.ex.structure[i].id != breadcrumb){
					$scope.breadcrumbs[i].opacity = 0;
				}
			}
		}

		
		
		// $scope.db.dyncols.push({data: 'id', title: 'ID'}, {data: 'name.first', title: 'First Name'});

	};



}]);