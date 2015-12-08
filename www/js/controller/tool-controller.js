'use strict';

var sharetoolApp = angular.module("sharetoolApp");

sharetoolApp.controller('ToolCtrl', ['$scope', '$stateParams', '$ionicHistory', '$ionicFilterBar','geolocationService','apiService', 'persistentDataService', function($scope, $stateParams, $ionicHistory, $ionicFilterBar, geolocationService, apiService, persistentDataService){

	$scope.toolList = [];
	$scope.tool = {};
	$scope.toolTotalPrice = "No indicado"
	$scope.toolFilters = angular.copy(persistentDataService.getToolFilterData());
	$scope.locationEnabled = false;
	$scope.currentPosition = null;
	$scope.availableToolOrder = apiService.toolsOrder;
	
	var filterBarInstance;
	
	$scope.listUpdate = function(){
		
		var filters = persistentDataService.getToolFilterData()
		var maxPrice = filters.maxPriceCheck ? filters.maxPrice : null;
		var maxDistance = filters.maxDistanceCheck ? filters.maxDistance : null;
		var lat = $scope.currentPosition != null ? $scope.currentPosition.latitude : null;
		var lng = $scope.currentPosition != null ? $scope.currentPosition.longitude : null;
		
		$scope.toolList = apiService.findTools(filters.name, maxPrice, maxDistance, lat, lng, filters.toolOrder);
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
    
    $scope.loadTool = function(){
    	
    	$scope.tool = apiService.getToolById($stateParams.toolId);
    	$scope.toolTotalPrice = "No indicado";
    	
    	var filters = persistentDataService.getToolFilterData()
		if(filters.dateCheck){
			$scope.toolTotalPrice = $scope.tool.pricePerDay * filters.days;
		}
    }
    
    $scope.showFilterBar = function () {
        
    	var filters = persistentDataService.getToolFilterData();
    	
    	filterBarInstance = $ionicFilterBar.show({
          items: $scope.toolList,
          update: function (filteredItems, filterText) {
        	filters.name = filterText;
        	$scope.listUpdate();
          }
        });
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
