expHandsonTable.factory('DataService', ['$interval', '$filter', '$http', '$compile', '$timeout',  function($interval, $filter, $http, $compile, $timeout){

	var hiddenfields = [];
	var datastructure = [];


	// load the hidden Fields
	// Note: You only need to provide the item with the deepest level
	// ******************************
	$http.get('data/hiddenFields.json').
	success(function(data, status, headers, config) {
		for(var i = 0; i < data.length; i++){
			hiddenfields.push(data[i]);
		}

	}).
	error(function(data, status, headers, config) {
		console.log("ERROR retrieving hiddenFields");
		alert("ERROR retrieving hiddenFields")
	});

	// get the data
	// ******************
	$http.get('data/data.json').
  success(function(data, status, headers, config) {
		for(var i = 0; i < data.length; i++){
			datastructure.push(data[i]);
		}

  }).
  error(function(data, status, headers, config) {
    console.log("ERROR retrieving data");
		alert("ERROR retrieving data")
  });

	return {
		datastructure: datastructure,
		hiddenfields: hiddenfields
	};

}]); // Ende von DataService
