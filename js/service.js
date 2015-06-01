expHandsonTable.factory('DataService', ['$interval', '$filter', '$http', '$compile', '$timeout',  function($interval, $filter, $http, $compile, $timeout){

	var datastructure = [];

	$http.get('data/data.json').
  success(function(data, status, headers, config) {
		for(var i = 0; i < data.length; i++){
			datastructure.push(data[i]);
		}
		$timeout(function(){
			datastructure.push({
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
			console.log("SERVICE datastructure");
			console.log(datastructure);
		}, 500);

		$timeout(function(){
			datastructure.push({
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
			console.log("SERVICE datastructure");
			console.log(datastructure);
		}, 1000);
  }).
  error(function(data, status, headers, config) {
    console.log("ERROR retrieving data");
		alert("ERROR retrieving data")
  });


	return {
		datastructure: datastructure
	};

}]); // Ende von DataService
