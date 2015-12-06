'use strict';

var sharetoolApp = angular.module("sharetoolApp");

sharetoolApp.controller('ToolCtrl', ['$scope', '$ionicHistory','geolocationService','apiService', function($scope, $ionicHistory, geolocationService, apiService){

	$scope.toolList =[];
	$scope.locationEnabled = false;
	$scope.currentPosition = null;
	
	$scope.listUpdate = function(){
		
		$scope.toolList = apiService.findTools();
	}
	
	$scope.watchGeolocation = function(){
		
		$scope.locationEnabled = !$scope.locationEnabled;
		
		if($scope.locationEnabled){
			geolocationService.start(onUpdateLocation, onUpdateLocationError);
		} else {
			geolocationService.stop();
		}
		
		console.log('Location enabled: '+$scope.locationEnabled);
	}
	
	function onUpdateLocation(position) {
		$scope.currentPosition = position.coords;
		console.log($scope.currentPosition);
	}

	function onUpdateLocationError(error) {
		alert("Error: " + error);
		$scope.locationEnabled = false;
	}
	
	
	
	
	
}]);
