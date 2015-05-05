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



				scope.updateTableData = function(data){
					var input = scope.initialData(data);
					hot.loadData(input);
				};

				scope.initialData = function(data){
					tablestructure = [];

					for(var i = 0; i < data.length; i++){
						tablestructure.push([]);
						var cnt = 0;
						for(key in data[i]){
							tablestructure[i][cnt] = data[i][key];
							cnt++;
						}
					}
					return tablestructure;
				}

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

				scope.updateScopeData = function(changedData){
					if(changedData != null){
						var objectIndex = changedData[0][0];
						var objectItemIndex = changedData[0][1];
						var oldValue = changedData[0][2];
						var newValue = changedData[0][3];

						scope.data[objectIndex][scope.params[objectItemIndex]] = newValue;
					}
				};

				scope.createTable = function(){

					var uniqid = Date.now();
					element.append("<div id="+uniqid+"></div>");
					var elem = document.getElementById(uniqid);

					var hotTable = new Handsontable(elem, {
					  data: placeholderArray,
					  minSpareRows: 1,
					  rowHeaders: false,
						colHeaders: true,
					  contextMenu: true,
						afterChange: function(change, source){
							console.log("table changed");
							// scope.updateScopeData(change);
						},
						afterSelection: function(row, col){
							scope.clickCell(row, col);
						}
					});
					tableArray.push(hotTable);
					return hotTable;
				};

				scope.cleanTables = function(){
					if(tableArray.length > 1){
						console.log("Array is not empty");
						tableArray[tableArray.length-2].destroy();
					}
				};


				scope.clickCell = function(row, col){


					// THIS IS NOT GOOD - BECAUSE I DON'T TRACK THE PATH I CAN ONLY PARSE DATA from the first level
					var cellData = tablestructure[row][col];


					console.log(cellData);


					if(cellData[0].toString() == "[object Object]"){
						console.log("I am an Array of Objects!");
						var table = scope.createTable();
						var parsedData = scope.parseObjectData(cellData);
						table.loadData(parsedData);
						scope.cleanTables();


					} else if(isArray(cellData)){
						console.log("I am an Array");
						var array = [];
						array.push(cellData);
						var table = scope.createTable();
						table.loadData(array);
						scope.cleanTables();
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

				var placeholderArray = [[]];
				var hot = new Handsontable(element[0], {
				  data: placeholderArray,
				  minSpareRows: 1,
				  rowHeaders: false,
					colHeaders: scope.header,
				  contextMenu: true,
					afterChange: function(change, source){
						console.log("table changed");
						scope.updateScopeData(change);
					},
					afterSelection: function(row, col){
						scope.clickCell(row, col);
					}
				});


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
