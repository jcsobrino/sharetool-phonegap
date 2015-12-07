'use strict';

var sharetoolApp = angular.module("sharetoolApp");

sharetoolApp.controller('ToolCtrl', ['$scope', '$ionicHistory','geolocationService','apiService', 'persistentDataService', function($scope, $ionicHistory, geolocationService, apiService, persistentDataService){

	$scope.toolList = [];	
	$scope.toolFilters = angular.copy(persistentDataService.getToolFilterData());
	$scope.locationEnabled = false;
	$scope.currentPosition = null;
	$scope.availableToolOrder = apiService.toolsOrder;
	
	$scope.listUpdate = function(){
		console.log('update');
		var filters = persistentDataService.getToolFilterData()
		var maxPrice = filters.maxPriceCheck ? filters.maxPrice : null;
		var maxDistance = filters.maxDistanceCheck ? filters.maxDistance : null;
		var lat = $scope.currentPosition != null ? $scope.currentPosition.latitude : null;
		var lng = $scope.currentPosition != null ? $scope.currentPosition.longitude : null;
		
		$scope.toolList = apiService.findTools(null, maxPrice, maxDistance, lat, lng, filters.toolOrder);
		$scope.$broadcast('scroll.refreshComplete');
	}
	
	$scope.cancelFilters = function() {
 		$scope.toolFilters = angular.copy(persistentDataService.getToolFilterData());
 		$ionicHistory.goBack();
    };
    
    $scope.acceptFilters = function() {
    	persistentDataService.updateToolFilterData($scope.toolFilters);
        $ionicHistory.goBack();
    };
	
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
	
	
	//$scope.listUpdate();
	
	
	
	
}]);
