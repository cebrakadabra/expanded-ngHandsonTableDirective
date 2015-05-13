/* using handson.full.js */
/* easier approach to wrap this */
	expHandsonTable.directive('handsonfullDirective', [function (){
		return {
      restrict : 'EA',
      transclude : false,
      scope: {
				data: "=",
				header: "="
      },
      link : function(scope, element, attrs) {
				var tablestructure = [];
				var tableArray = [];
				var keys = [];

				var path = [];


// ******************
				// updates tableData on changes of the scope
				scope.updateTableData = function(data){
					var input = scope.initialData(data);
					hot.loadData(input);
				};

// ******************
				// parses the initial data from the isolated scope
				scope.initialData = function(data){
					tablestructure = [];

					for(var i = 0; i < data.length; i++){
						tablestructure.push([]);
						var cnt = 0;
						for(key in data[i]){
							keys.push(key);
							tablestructure[i][cnt] = data[i][key];
							cnt++;
						}
					}
					return tablestructure;
				}

// ******************
				// parses array of objects to array of arrays as input for HandsonTable
				scope.parseObjectData = function(data){
					var structure = [];

					for(var i = 0; i < data.length; i++){
						structure.push([]);
						var cnt = 0;
						for(key in data[i]){
							structure[i][cnt] = data[i][key];
							cnt++;
						}
					}
					return structure;

				};

// ******************
				// updates the scope data, if modifications in the table are made
				scope.updateScopeData = function(changedData){
					if(changedData != null){
						var objectIndex = changedData[0][0];
						var objectItemIndex = changedData[0][1];
						var oldValue = changedData[0][2];
						var newValue = changedData[0][3];

						scope.data[objectIndex][keys[objectItemIndex]] = newValue;
					}
				};

// ******************
				// creates a new Handsontable
				scope.createTable = function(customheaders){

					var uniqid = Date.now();
					element.append("<div id="+uniqid+"></div>");
					var elem = document.getElementById(uniqid);

					// create new table
					var hotTable = new Handsontable(elem, {
					  data: placeholderArray,
					  minSpareRows: 1,
					  rowHeaders: false,
						colHeaders: customheaders,
					  contextMenu: false,
						afterChange: function(change, source){
							console.log("table changed");
							// scope.updateScopeData(change);
						},
						afterSelection: function(row, col){
							scope.clickCell(row, col, false, hotTable);
						}
					});

// ******************
					// push it to overall table array
					tableArray.push(hotTable);

					// return current table
					return hotTable;
				};

// ******************
				// only holds the last shown table in memory
				scope.cleanTables = function(){
					if(tableArray.length > 0){
						console.log("Clean up tables, start from origin");
						// tableArray[tableArray.length-2].destroy();
						for(var i = 0; i < tableArray.length; i++){
							tableArray[i].destroy();
						}
						tableArray = [];
					}
				};

				// scope.deleteLastTable = function(){
				// 	if(tableArray.length > 1){
				// 		tableArray[tableArray.length-1].destroy();
				// 	}
				// };

// ******************
				// callback event, if cell got clicked
				scope.clickCell = function(row, col, origin, clickedTable){

					var cellData = null;
					if(origin){
						// clear tables if origin table is clicked
						scope.cleanTables();
						cellData = tablestructure[row][col];
					} else{
						var actualTable = clickedTable;
						var tableDataArray = actualTable.getData();
						cellData = tableDataArray[row][col];
					}

					// I AM AN ARRAY OF OBJECTS
					if(cellData[0].toString() == "[object Object]"){

						// if(!origin){
						// 	// delete last table onClick to determine double creations
						// 	scope.deleteLastTable();
						// }


						// custom headers from json
						var headkeys = [];
						for(key in cellData[0]){
							headkeys.push(key);
						}

						var table = scope.createTable(headkeys);
						var parsedData = scope.parseObjectData(cellData);
						table.loadData(parsedData);

						// I AM AN ARRAY
					} else if(isArray(cellData)){

						// if(!origin){
						// 	// delete last table onClick to determine double creations
						// 	scope.deleteLastTable();
						// }

						// custom headers from json
						var headkeys = [];
						for(var i = 0; i < cellData.length; i++){
							headkeys.push(i);
						}

						var array = [];
						array.push(cellData);
						var table = scope.createTable(headkeys);
						table.loadData(array);
					} else{
						return;
					}

				};

				var isArray = function(a) {
				    return (!!a) && (a.constructor === Array);
				};

				var isObject = function(a) {
				    return (!!a) && (a.constructor === Object);
				};

// ******************
				// create initial Handsontable
				var placeholderArray = [[]];
				var hot = new Handsontable(element[0], {
				  data: placeholderArray,
				  minSpareRows: 1,
				  rowHeaders: false,
					colHeaders: scope.header,
				  contextMenu: false,
					afterChange: function(change, source){
						console.log("table changed");
						scope.updateScopeData(change);
					},
					afterSelection: function(row, col){
						scope.clickCell(row, col, true);
					}
				});

// ******************
				// watches changes on scope.data of directive
				scope.$watch('data', function(newValue, oldValue) {
						if (newValue){
							console.log("I can see new data");
							scope.updateTableData(scope.data);
						}
				}, true);


      }
		};
	}])

 ;
