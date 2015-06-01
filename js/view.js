/* using handson.full.js */
/* easier approach to wrap this */
	expHandsonTable.directive('handsonfullDirective', ['$timeout', function ($timeout){
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
				var rendererArray = [];
				var curPath = [];
				var tableIsOrigin = false;
				var clickedTableArray = [];
				var initTableArray = [];
				var headerarray = [];


				var pos = {x: 0, y: 0};
				var mouse = {x: 0, y: 0};
				var oldLeft = 0, oldTop = 0;
				document.addEventListener('mousemove', function(e){
					//	console.log(e.target.parent());
				    mouse.x = e.clientX || e.pageX;
				    mouse.y = e.clientY || e.pageY
				}, false);


// ******************
				// set initial headers manually if not set
			scope.initialHeaderSettings  = function(data){
					if(scope.header === undefined || scope.header.length === 0){

					for(key in scope.data[0]){
						headerarray.push(key);
						rendererArray.push({renderer: coverRenderer});
					}
					console.log("HEADERARRAY LENGTH: "+headerarray.length);
					console.log("data LENGTH: "+data[0].length);
				} else{
					for(var i = 0; i < scope.header.length; i++){
						rendererArray.push({renderer: coverRenderer});
					}
					headerarray = scope.header;
				}
			};


// ******************
				// updates tableData on changes of the scope
				scope.updateTableData = function(data, table){

					var input = scope.initialData(data);
					console.log(input);
					table.loadData(input);
					var instance = table.getInstance();
					instance.render();
					// if(input.length > 0){
					// 	var actualtable = input;
					// 	var maxlength = actualtable[0].length;
					// 	var lastrow = actualtable[actualtable.length-1];
					// 	if(!jQuery.isEmptyObject(lastrow)){
					// 		var lr = lastrow.slice(0, maxlength);
					// 		actualtable[actualtable.length-1] = lr;
					// 		console.log(actualtable);
					// 		// table.loadData(actualtable);
					// 	}
					// }


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
							if(data[i][key] != null){
								tablestructure[i][cnt] = data[i][key];
								cnt++;
							}

						}
					}
					// for(var i = 0; i < tablestructure.length; i++){
					// 	if(i !== 0){
					// 		if(tablestructure[i-1] < tablestructure[i]){}
					// 	}
					// }
					console.log("Tablestructure");
					console.log(tablestructure.length);
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
				// update table on cell change
				scope.updateCurrentTable = function(change, source, table){

					// console.log(change);

					if(change != null){

						var curTableDataArray = table.getData();
						var newVal = change[0][3];
						var row = change[0][0];
						var col = change[0][1];
						// curTableDataArray[row][col] = newVal;

						if(isArray(change[0])){
							if(newVal.charAt(0) == "["){
								try{
									curTableDataArray[row][col] = JSON.parse(newVal);
								} catch(e){
									alert(e);
								}

							} else{
								curTableDataArray[row][col] = newVal;
							}

						} else{
							var newVal = change[3];
							var row = change[0];
							var col = change[1];
							curTableDataArray[row][col] = newVal;
						}
						var rerender = table.getInstance();
						// console.log(rerender);
						rerender.render();
						// table.loadData(tableArray);
					}

			};


// ******************
				// updates the scope data, if modifications in the table are made
				scope.updateScopeData = function(table){
					// if(changedData != null){
					// 	var objectIndex = changedData[0][0];
					// 	var objectItemIndex = changedData[0][1];
					// 	var oldValue = changedData[0][2];
					// 	var newValue = changedData[0][3];
					//
					// 	// CHECK IF IT EXISTS, OTHERWISE CREATE NEW ONE, undefined check etc.
					// 	// furthermore, check level and insert correctly
					// 	// scope.data[objectIndex][keys[objectItemIndex]] = newValue;
					// }
					if(table != null){

						var tableData = table.getData();
						var colHeaders = table.getColHeader();


						var helperArrayObject = [];
						var currObject = {};

						if(colHeaders[0] != 0){
							for(var i = 0; i < tableData.length; i++){
								helperArrayObject.push({});
								currObject = {};
								for(var x = 0; x < colHeaders.length; x++){
										currObject[colHeaders[x]] = tableData[i][x];
								}
								helperArrayObject[i] = currObject;
							}
							// remove empty row
							helperArrayObject.pop();
						} else{
							helperArrayObject = tableData[0];
						}

						if(tableIsOrigin){
							scope.data = [];
							// $timeout(function(){
							// scope.$apply(function(){
								scope.data = helperArrayObject;
      				//});
							// });

							// $timeout(function(){
							//
							// 	scope.$apply;
							// });
						}else{

							var identifier = [];
							var i = curPath.length;
							// console.log(i);
							if(i >= 2){
								var objectkeys = [];
								for(k in scope.data[curPath[0]]){
									objectkeys.push(k);
								}
								if(curPath != [] && curPath != undefined && curPath != null){
										identifier.push(objectkeys[curPath[1]]);
										if(i <= 2 && i < 4){
											scope.data[curPath[0]][identifier[0]] = helperArrayObject;
										}
								}
							}
							if(i >= 4){
								var objectkeys = [];
								for(k in scope.data[curPath[0]][identifier[0]][curPath[2]]){
									objectkeys.push(k);
								}
								if(curPath != [] && curPath != undefined && curPath != null){
										identifier.push(objectkeys[curPath[3]]);
										if(i >= 4 && i < 6){
											scope.data[curPath[0]][identifier[0]][curPath[2]][identifier[1]] = helperArrayObject;
										}
								}
							}
							if(i >= 6){
								var objectkeys = [];
								for(k in scope.data[curPath[0]][identifier[0]][curPath[2]][identifier[1]][curPath[4]]){
									objectkeys.push(k);
								}
								if(curPath != [] && curPath != undefined && curPath != null){
										identifier.push(objectkeys[curPath[5]]);
										if(i >= 6 && i < 8){
											scope.data[curPath[0]][identifier[0]][curPath[2]][identifier[1]][curPath[4]][identifier[2]] = helperArrayObject;
										}
								}
							}
							if(i >= 8){
								var objectkeys = [];
								for(k in scope.data[curPath[0]][identifier[0]][curPath[2]][identifier[1]][curPath[4]][identifier[2]][curPath[6]]){
									objectkeys.push(k);
								}
								if(curPath != [] && curPath != undefined && curPath != null){
										identifier.push(objectkeys[curPath[7]]);
										if(i >= 8 && i < 10){
											scope.data[curPath[0]][identifier[0]][curPath[2]][identifier[1]][curPath[4]][identifier[2]][curPath[6]][identifier[3]] = helperArrayObject;
										}
								}
							}
							if(i >= 10){
								var objectkeys = [];
								for(k in scope.data[curPath[0]][identifier[0]][curPath[2]][identifier[1]][curPath[4]][identifier[2]][curPath[6]][identifier[3]][curPath[8]]){
									objectkeys.push(k);
								}
								if(curPath != [] && curPath != undefined && curPath != null){
										identifier.push(objectkeys[curPath[9]]);
										if(i >= 10 && i < 12){
											scope.data[curPath[0]][identifier[0]][curPath[2]][identifier[1]][curPath[4]][identifier[2]][curPath[6]][identifier[3]][curPath[8]][identifier[4]] = helperArrayObject;
										}
								}
							}
							if(i >= 12){
								var objectkeys = [];
								for(k in scope.data[curPath[0]][identifier[0]][curPath[2]][identifier[1]][curPath[4]][identifier[2]][curPath[6]][identifier[3]][curPath[8]][identifier[4]][curPath[10]]){
									objectkeys.push(k);
								}
								if(curPath != [] && curPath != undefined && curPath != null){
										identifier.push(objectkeys[curPath[11]]);
										if(i >= 10 && i < 12){
											scope.data[curPath[0]][identifier[0]][curPath[2]][identifier[1]][curPath[4]][identifier[2]][curPath[6]][identifier[3]][curPath[8]][identifier[4]][curPath[10]][identifier[5]] = helperArrayObject;
										}
								}
							}







						}


						// console.log("==========");
						// console.log(curPath);
						// console.log("==========");
						//
						//
						// console.log("HELPERARRAYOBJECT");
						// console.log(helperArrayObject);
						// console.log("***");
						console.log("SCOPEDATA");
						console.log(scope.data);
						console.log("***");

					}

				};

// ******************
				// creates a new Handsontable
				scope.createTable = function(customheaders, renderers){

					// get current position of next generated table
					scope.positionOfTable();

					var uniqid = Date.now();
					element.append("<div id="+uniqid+" style='position: fixed; left: "+pos.x+"px; top: "+pos.y+"px;'></div>");
					var elem = document.getElementById(uniqid);

					// create new table
					var hotTable = new Handsontable(elem, {
					  data: [[]],
					  minSpareRows: 1,
					  rowHeaders: false,
						colHeaders: customheaders,
						columnSorting: true,
					  contextMenu: true,
						columns: renderers,
						afterChange: function(change, source){
							// console.log("table changed");
							scope.updateCurrentTable(change, source, hotTable);
							scope.updateScopeData(hotTable);
						},
						afterSelectionEnd: function(row, col){
							scope.clickCell(row, col, false, hotTable);
						},
						afterRemoveRow: function(){
							// console.log("row removed");
						},
						afterCreateCol: function(){
							// console.log("col created");
						},
						afterCreateRow: function(){
							// console.log("row created");

						}
					});

				// 	var container = document.getElementById("example");
				// 	var hot = new Handsontable(elem, {
				// 	data: [[]],
				// 	colHeaders: true,
				// 	rowHeaders: true,
				// 	stretchH: 'all',
				// 	columnSorting: true,
				// 	contextMenu: true
				// });
				//
				// 	hot.loadData(data);

// ******************
					// push it to overall table array
					tableArray.push(hotTable);

					// return current table
					return hotTable;
				};

// ******************
				// cleans up all tables if origin table was clicked
				scope.cleanTables = function(){
					if(tableArray.length > 0){
						// console.log("Clean up tables, start from origin");
						for(var i = 0; i < tableArray.length; i++){
							tableArray[i].destroy();
						}
						tableArray = [];
					}
				};

// ******************
				// destroy all table paths,
				// if table path is longer than actual clicked table index
				scope.updateTablePath = function(clickedTable){
					for(var i = tableArray.length-1; i >= 0; i--){
						if(clickedTable != tableArray[i]){
							tableArray[i].destroy();
							tableArray.pop();
						} else{
							break;
						}
					}
				};


// ******************
				// get current position of next generated table
				scope.positionOfTable = function(){
					pos.x = 0;
					pos.y = 0;
					var current = $("td.current");
					var left = 0;
					var top = 0;
					var height = 0;
					var clickOffset = 50;
					var maxX = mouse.x + clickOffset;
					var minX = mouse.x - clickOffset;
					var minY = mouse.y - clickOffset;
					var maxY = mouse.y + clickOffset;

					for(var i = 0; i < current.length; i++){
						var offset = $(current[i]).offset();
						left = offset.left;
						top = offset.top;
						height = current[i].offsetHeight;
					}

					if((left < maxX) && (left > minX) && (top < maxY) && (top > minY)){
						pos.x = left;
						pos.y = top + height;
					}
				};

// ******************
				// callback event, if cell got clicked
				scope.clickCell = function(row, col, origin, clickedTable, event){

					// destroy all table paths,
					// if table path is longer than actual clicked table index
					scope.updateTablePath(clickedTable);

					var cellData = null;
					if(origin){
						// clear tables if origin table is clicked
						scope.cleanTables();
						cellData = tablestructure[row][col];
						curPath = [];

						if(cellData != null){
							if(!isObject(cellData[0]) && !isArray(cellData)){
								tableIsOrigin = true;
							} else{
								tableIsOrigin = false;
							}
						}

						// get current position of next generated table
						scope.positionOfTable();

					} else{
						var actualTable = clickedTable;
						var tableDataArray = actualTable.getData();
						cellData = tableDataArray[row][col];

						tableIsOrigin = false;

					}
					if(cellData != null){

						// save cell paths on click
						var tableArrayLength = tableArray.length;
						var doubleTableArrayLength = tableArrayLength*2;
						curPath = curPath.slice(0, doubleTableArrayLength);

						// I AM AN ARRAY OF OBJECTS
						//if(cellData[0].toString() == "[object Object]"){

						if(isObject(cellData[0])){

							curPath.push(row);
							curPath.push(col);

							// custom headers from json
							var headkeys = [];
							var renderers = [];
							for(key in cellData[0]){
								headkeys.push(key);
								renderers.push({renderer: coverRenderer});
							}

							var table = scope.createTable(headkeys, renderers);
							var parsedData = scope.parseObjectData(cellData);
							table.loadData(parsedData);

							// I AM AN ARRAY
						} else if(isArray(cellData)){

							curPath.push(row);
							curPath.push(col);

							// custom headers from json
							var headkeys = [];
							var renderers = [];
							for(var i = 0; i < cellData.length; i++){
								headkeys.push(i);
								renderers.push({renderer: coverRenderer});
							}

							var array = [];
							array.push(cellData);
							var table = scope.createTable(headkeys, null);
							table.loadData(array);
						} else{
							// return;
						}
					} else{
						// table can be edited and afterChange callback will be fired
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
				var hot = null;
				scope.initFirstTable = function(){
					// reset initial input tag
					element[0].innerHTML = '';
					var placeholderArray = [[]];

					// console.log(initTableArray[0]);
					hot = new Handsontable(element[0], {
					  data: placeholderArray,
					  minSpareRows: 1,
					  rowHeaders: false,
						colHeaders: headerarray,
					  contextMenu: true,
						columns: rendererArray,
						afterChange: function(change, source){
							// console.log("********");
							// console.log("table changed (root)");
							// console.log(change);
							// console.log(source);
							// console.log("********");
							scope.updateCurrentTable(change, source, hot);
							scope.updateScopeData(hot);
						},
						afterSelectionEnd: function(row, col){
							scope.clickCell(row, col, true);
						},
						afterRemoveRow: function(){
							// console.log("row removed");
						},
						afterCreateCol: function(){
							// console.log("col created");
						},
						afterCreateRow: function(){
							// console.log("row created");
						}
					});
					// initTableArray.pop();
					// initTableArray.push(hot);

				// 	return hot;
				};



// ******************
				// Icon Renderer
				function coverRenderer (instance, td, row, col, prop, value, cellProperties) {
			    var escaped = Handsontable.helper.stringify(value),
			      img,
						displayDiv;
						// console.log(value);

			    if (isArray(value)) {
						img = document.createElement('IMG');
						img.style.width = "30px";

						displayDiv = document.createElement('PRE');
						//styles
						displayDiv.style.position = "absolute";
						displayDiv.style.width = "300px";
						displayDiv.style.background = "#ffffff";
						displayDiv.style.color = "#aaa";
						displayDiv.style.fontSize = "10px";
						displayDiv.style.border = "1px solid #aaa";
						displayDiv.style.padding = "5px";
						displayDiv.style.display = "none";
						displayDiv.style.zIndex = "32000";
						displayDiv.id ="previewPre";

						document.body.appendChild(displayDiv);

						Handsontable.Dom.addEvent(img, 'mousedown', function (e){
							e.preventDefault(); // prevent selection quirk
						});

						Handsontable.Dom.addEvent(img, 'mouseenter', function (e){
							// console.log("mouseover");

							// div position
							displayDiv.style.left = e.pageX + "px";
							displayDiv.style.top = e.pageY + "px";

							// insert values
							displayDiv.innerHTML = JSON.stringify(value, undefined, 2);
							displayDiv.style.display = "block";
						});

						Handsontable.Dom.addEvent(img, 'mouseleave', function (e){
							// console.log("mouseleave");
							displayDiv.style.display = "none";

						});

						if(isObject(value[0])){
				      img.src = "images/object.png";
						} else{
				      img.src = "images/array.png";
						}

						Handsontable.Dom.empty(td);
						td.appendChild(img);



					} else {
			      // render as text
			      Handsontable.renderers.TextRenderer.apply(this, arguments);
			    }

					// console.log("TD: ");
					// console.log(td);
			    return td;
			  }

				scope.resetInitialTable = function(){
					if(initTableArray.length > 1){
						initTableArray[0].destroy();
						initTableArray.splice(0, 1);
					}
				}


// ******************
				// watches changes on scope.data of directive
				var first = true;
				scope.$watch('data', function(newValue, oldValue) {
						if (newValue){
							console.log("I can see new data");
							console.log("NEW VALUES");
							console.log(newValue);
							if(newValue[0] !== undefined && newValue[0] !== null){
								if(first){
									first = false;
									scope.initialHeaderSettings(newValue);
									scope.initFirstTable();
									scope.updateTableData(newValue, hot);
								} else{
									scope.updateTableData(newValue, hot);
								}



							}

							// scope.resetInitialTable();
							// scope.initialHeaderSettings(newValue);
							// var table = scope.initFirstTable();




						}
				}, true);


      }
		};
	}])

 ;
