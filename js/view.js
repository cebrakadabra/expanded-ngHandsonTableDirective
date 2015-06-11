// using handson.full.js
// provide an AngularJS Directive with additional functionality
expHandsonTable.directive('handsonfullDirective', function (){
	return {
		restrict : 'EA',
		transclude : false,
		scope: {
			data: "=",
			header: "=",
			hiddenfields: "="
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
			var globalFieldskipper = 0;

			var pos = {x: 0, y: 0};
			var mouse = {x: 0, y: 0};
			var oldLeft = 0, oldTop = 0;
			// global mousemove listener to get the current mouse position for displaying the preview overlay
			document.addEventListener('mousemove', function(e){
			    mouse.x = e.clientX || e.pageX;
			    mouse.y = e.clientY || e.pageY
			}, false);


// ******************
			// set initial headers manually if not set
			scope.initialHeaderSettings  = function(data, hiddenHeader){
				for(var i = 0; i < hiddenHeader.length; i++){
					rendererArray.push({data: hiddenHeader[i].data, renderer: coverRenderer});
				}

				if(scope.header === undefined || scope.header.length === 0){
					var helperArray = [];
					for(key in scope.data[0]){
						helperArray.push(key);
					}
					for(var i = 0; i < hiddenHeader.length; i++){
							headerarray.push(helperArray[hiddenHeader[i].data]);
					}

				} else{
					headerarray = scope.header;
				}
			};


// ******************
			// updates tableData on changes of the scope
			scope.updateTableData = function(data, table){
				var input = scope.initialData(data);
				table.loadData(input);
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
				return tablestructure;
			};


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
					rerender.render();
				}

			};


// ******************
			// updates the scope data, if modifications in the table are made
			scope.updateScopeData = function(table, allheader){
				if(table != null){

					var tableData = table.getData();
					var colHeaders = [];
					var helperArrayObject = [];
					var currObject = {};

					if(tableData[1] !== undefined){
						for(key in allheader){
							colHeaders.push(key);
						}

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
						}
					} else{
						helperArrayObject = tableData[0];
					}

					if(tableIsOrigin){
						scope.data = [];
						scope.data = helperArrayObject;

					}else{

						var identifier = [];
						var i = curPath.length;
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
					};

// -------------------------------------------------------------
// 				ENTRY POINT FOR SAVING DATA IN DATABASE AGAIN
// =============================================================
// *************************************************************
// =============================================================
// -------------------------------------------------------------

				console.log("SCOPEDATA NEEDS TO BE STORED HERE");
				console.log(scope.data);
				console.log("************************");

// -------------------------------------------------------------
// =============================================================
// *************************************************************
// =============================================================
// -------------------------------------------------------------

				}
			};


// ******************
			// creates a new Handsontable
			scope.createTable = function(customheaders, renderers, allheader, minsparerows, type){

				// get current position of next generated table
				scope.positionOfTable();

				var uniqid = Date.now();
				element.append("<div id="+uniqid+" style='position: fixed; left: "+pos.x+"px; top: "+pos.y+"px;'></div>");
				var elem = document.getElementById(uniqid);

				// create new table
				var hotTable = new Handsontable(elem, {
					data: [[]],
					minSpareRows: minsparerows,
					rowHeaders: false,
					colHeaders: customheaders,
					columnSorting: true,
				  contextMenu: true,
					columns: renderers,
					afterChange: function(change, source){
						// after Change Event - updates table and scope.data
						scope.updateCurrentTable(change, source, hotTable);
						scope.updateScopeData(hotTable, allheader);
					},
					afterSelectionEnd: function(row, col){
						if(type !== "array"){
							var currTableData = hotTable.getData();
							globalFieldskipper = currTableData[0].length - renderers.length;

							var newCol = col + globalFieldskipper;
							scope.clickCell(row, newCol, false, hotTable);
						} else{
							scope.updateScopeData(hotTable, allheader);
						}

					},
					afterRemoveRow: function(){
						// fires if row got removed
					},
					afterCreateCol: function(){
						// fires if col got created
					},
					afterCreateRow: function(){
						// fires after row got created

					}
				});

				// push it to overall table array
				tableArray.push(hotTable);

				// return current table
				return hotTable;
			};


// ******************
			// cleans up all tables if origin table was clicked
			scope.cleanTables = function(){
				if(tableArray.length > 0){
					// Clean up tables, start from origin
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
			// compares the keysets of two objects
			scope.compareKeys = function(a, b) {
			  var aKeys = Object.keys(a).sort();
			  var bKeys = Object.keys(b).sort();
			  return JSON.stringify(aKeys) === JSON.stringify(bKeys);
			};


// ******************
			// returns the hiddenFields for a specific created Table
			scope.returnSpecificHiddenFields = function(data){
				var keyArray = [];
				for(key in data){
					keyArray.push(key);
				}

				var setToTrueArray = {};
				for(var i = 0; i < keyArray.length; i++){
					var key = keyArray[i];
					setToTrueArray[key] = true;
				}

				var hiddenFields = scope.hiddenfields;
				var hiddenFieldsStructure = function(hiddenFieldData){

					for(key in hiddenFieldData){
						if(isArray(hiddenFieldData[key])){
							var array = hiddenFieldData[key];
							if(isObject(array[0])){
								if(scope.compareKeys(array[0], setToTrueArray)){
									// MATCH! keys are matching, this is the array with hidden Colums config we need
									return array[0];
								} else{
									// NO MATCH! go to the next level and find match
									return hiddenFieldsStructure(array[0]);
								}
							}

						}
					}

				}

				var hiddenFieldsStructureResult = hiddenFieldsStructure(hiddenFields[0]);
				return hiddenFieldsStructureResult;
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
						if(isObject(cellData[0]) || isArray(cellData)){
							tableIsOrigin = false;
						}
					} else{
							tableIsOrigin = true;
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
					if(isObject(cellData[0])){
						curPath.push(row);
						curPath.push(col);

						// custom headers from json
						var headkeys = [];
						var renderers = [];

						// take care of Hidden Fields while creating new Tables
						// **************** BEGIN
						var createhiddenFields = scope.returnSpecificHiddenFields(cellData[0]);
						var helperHiddenFieldArray = [];
						var i = 0;
						globalFieldskipper = 0;
						for(key in createhiddenFields){
							if(createhiddenFields[key] !== false){
								helperHiddenFieldArray.push({data: i});
							} else{
								globalFieldskipper++;
							}
							i++;
						}

						for(var i = 0; i < helperHiddenFieldArray.length; i++){
							renderers.push({data: helperHiddenFieldArray[i].data, renderer: coverRenderer});
						}

						var helperArray = [];
						for(key in cellData[0]){
							helperArray.push(key);
						}
						for(var i = 0; i < helperHiddenFieldArray.length; i++){
							headkeys.push(helperArray[helperHiddenFieldArray[i].data]);
						}
						// **************** END

						var minsparerows = 1;
						var type = "object";
						var table = scope.createTable(headkeys, renderers, createhiddenFields, minsparerows, type);
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
						var minsparerows = 0;
						var type = "array";
						var table = scope.createTable(headkeys, null, null, minsparerows, type);
						table.loadData(array);
					} else{
						// return;
					}
				} else{
					// table can be edited and afterChange callback will be fired
				}
			};

			// checks if a is an array and returns true or false
			var isArray = function(a) {
			    return (!!a) && (a.constructor === Array);
			};

			// checks if a is an object and returns true or false
			var isObject = function(a) {
			    return (!!a) && (a.constructor === Object);
			};


// ******************
			// create initial Handsontable
			var hot = null;
			scope.initFirstTable = function(allHeader){
				// reset initial input tag
				element[0].innerHTML = '';
				var placeholderArray = [[]];

				hot = new Handsontable(element[0], {
				  data: placeholderArray,
				  minSpareRows: 1,
				  rowHeaders: false,
					colHeaders: headerarray,
				  contextMenu: true,
					columns: rendererArray,
					afterChange: function(change, source){
						// after Change Event - updates table and scope.data
						scope.updateCurrentTable(change, source, hot);
						scope.updateScopeData(hot, allHeader);
					},
					afterSelectionEnd: function(row, col){
						// fires after selected col got left
						var newCol = col + globalFieldskipper;
						scope.clickCell(row, newCol, true);
					},
					afterRemoveRow: function(){
						// fires if row gets removed
					},
					afterCreateCol: function(){
						// fires if col gets created
					},
					afterCreateRow: function(){
						// fires if row gets created
					}
				});
			};


// ******************
			// Icon Renderer
			function coverRenderer (instance, td, row, col, prop, value, cellProperties) {
				var escaped = Handsontable.helper.stringify(value),
				img,
				displayDiv;

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

					// mouseenter event for display preview of structure
					Handsontable.Dom.addEvent(img, 'mouseenter', function (e){

						// div position
						displayDiv.style.left = e.pageX + "px";
						displayDiv.style.top = e.pageY + "px";

						// insert values
						displayDiv.innerHTML = JSON.stringify(value, undefined, 2);
						displayDiv.style.display = "block";
					});

					// fires on mouseleave of current displayed preview table element
					Handsontable.Dom.addEvent(img, 'mouseleave', function (e){
						displayDiv.style.display = "none";
					});
					// checks if value of cell is object or an array and display right symbol
					if(isObject(value[0])){
						img.src = "images/object.png";
					} else{
						img.src = "images/array.png";
					}

					Handsontable.Dom.empty(td);
					td.appendChild(img);

				} else {
					// render as text, if it's whether an array nor an object
					Handsontable.renderers.TextRenderer.apply(this, arguments);
				}

				return td;
			}


// ******************
			// parse the input structure for hidden columns
			scope.parseHiddenFields = function(fields){

				var generateHiddenStructure = [];
				var hiddenStructure = fields[0];
				var i = 0;
				globalFieldskipper = 0;
				for(key in hiddenStructure){
					if(hiddenStructure[key] != false){
						generateHiddenStructure.push({data: i});
					} else{
						globalFieldskipper++;
					}
					i++;
				}
				return generateHiddenStructure;
			};


// ******************
			// watches changes on scope.data of directive
			var first = true;
			scope.$watch('data', function(newValue, oldValue) {
					if (newValue){
						console.log("I can see new data");
						if(newValue[0] !== undefined && newValue[0] !== null){
							if(first){
								first = false;
								var hiddenCols = scope.parseHiddenFields(scope.hiddenfields);
								scope.initialHeaderSettings(newValue, hiddenCols);
								var allHiddenCols = scope.hiddenfields[0];
								scope.initFirstTable(allHiddenCols);
								scope.updateTableData(newValue, hot);
							} else{
								scope.updateTableData(newValue, hot);
							}
						}
					}
			}, true);


// ******************
			// watches changes on scope.hiddenfields of directive
			// *not needed
			scope.$watch('hiddenfields', function(newValue, oldValue){

			}, true);

		}
	};
});
