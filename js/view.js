exHandson.directive('exhandsonDirective', function($parse) {
    return {
      restrict: 'E',
      scope: {
	      config: '='
	    },
      	link: function exHandson(scope, element, attrs, $watch) {


			





// observing changes in the config scope			
// ********************************* WATCHES **********************************
	
	// scope.$watch('config', function(newconf, oldconf) {
	// 	scope.redrawChart(newconf);
	// });

// ********************************* WATCHES END **********************************


			


      } // exHandson end
    }; // return end
}); // directive end