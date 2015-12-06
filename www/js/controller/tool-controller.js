'use strict';

var sharetoolApp = angular.module("sharetoolApp");

sharetoolApp.controller('ToolCtrl', ['$scope', '$ionicHistory','geolocationService','apiService', function($scope, $ionicHistory, geolocationService, apiService){

	$scope.toolList =[];
	$scope.locationEnabled = false;
	$scope.currentPosition = null;
	
	for(var i=0;i<50;i++){
		$scope.toolList.push({"id":i,"name":"Nombre "+i,lat:50.23,lng:21.2,price:3.23});
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
