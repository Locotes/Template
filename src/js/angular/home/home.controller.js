(function(angular){ 
	'use strict';

	angular.module('home')
		.controller('homeCtrl', function($scope) {
			$scope.helloWorld = 'Hello, world!';
		});
	
})(angular);