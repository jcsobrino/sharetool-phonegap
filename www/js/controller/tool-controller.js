'use strict';

var sharetoolApp = angular.module("sharetoolApp");

sharetoolApp.controller('ToolCtrl', ['$scope', '$state', '$stateParams', '$ionicFilterBar', '$ionicPopup','geolocationService','apiService', 'persistentDataService', function($scope, $state, $stateParams, $ionicFilterBar, $ionicPopup, geolocationService, apiService, persistentDataService){

	$scope.toolList = [];
	$scope.tool = {};
	$scope.toolTotalPrice = "No indicado"
	$scope.toolFilters = angular.copy(persistentDataService.getToolFilterData());
	$scope.locationEnabled = persistentDataService.isLocationEnabled();
	$scope.currentPosition = persistentDataService.getLastKnownGeoposition();
	$scope.availableToolOrder = apiService.toolsOrder;
	
	var filterBarInstance;
	
	if($scope.locationEnabled){
		geolocationService.start(onUpdateLocation, onUpdateLocationError);
	}
	
	$scope.listUpdate = function(){
		
		$scope.toolList = null;
		
		var filters = persistentDataService.getToolFilterData()
		var maxPrice = filters.maxPriceCheck ? filters.maxPrice : null;
		var maxDistance = filters.maxDistanceCheck ? filters.maxDistance : null;
		var lat = $scope.currentPosition != null ? $scope.currentPosition.latitude : null;
		var lng = $scope.currentPosition != null ? $scope.currentPosition.longitude : null;

		apiService.simulateDelay(function(){
			$scope.toolList = apiService.findTools(filters.name, maxPrice, maxDistance, lat, lng, filters.toolOrder);
			$scope.$broadcast('scroll.refreshComplete');
		});

	}
	
	$scope.cancelFilters = function() {
 		$scope.toolFilters = angular.copy(persistentDataService.getToolFilterData());
 		$state.go('toolList');
    };
    
    $scope.acceptFilters = function() {
    	persistentDataService.updateToolFilterData($scope.toolFilters);
    	$state.go('toolList');
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
		persistentDataService.setLocationEnabled($scope.locationEnabled);
		
		if($scope.locationEnabled){
			geolocationService.start(onUpdateLocation, onUpdateLocationError);
		} else {
			geolocationService.stop();
			persistentDataService.updateLastKnownGeoposition(null);
		}
		
		console.log('Location enabled: '+$scope.locationEnabled);
	}

	function onUpdateLocation(position) {
		$scope.currentPosition = position.coords;
		persistentDataService.updateLastKnownGeoposition($scope.currentPosition);
		console.log($scope.currentPosition);
	}

	function onUpdateLocationError(error) {
		$scope.locationEnabled = false;
		persistentDataService.setLocationEnabled($scope.locationEnabled);
		console.log("Error updating location");
	}
	
	$scope.rentToolDialog = function() {
		$ionicPopup.confirm({
		     title: 'Alquiler herramienta',
		     template: 'Confirma que quiere alquilar esta herramienta?'
		   })
		   .then(function(res) {
			   if(res) {
				   $state.go('toolList');
			   } 
	    });
	};
	
}]);
