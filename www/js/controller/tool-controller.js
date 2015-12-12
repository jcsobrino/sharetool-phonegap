/**
 * Controller que contiene todas las funciones de gestión de las herramientas
 */

'use strict';

var sharetoolApp = angular.module("sharetoolApp");

sharetoolApp.controller('ToolCtrl', ['$scope', '$state', '$stateParams', '$ionicFilterBar', '$ionicPopup', '$ionicSideMenuDelegate','geolocationService','apiService', 'persistentDataService', function($scope, $state, $stateParams, $ionicFilterBar, $ionicPopup, $ionicSideMenuDelegate, geolocationService, apiService, persistentDataService){

	$scope.toolList = [];
	$scope.tool = {};
	$scope.toolTotalPrice = "No indicado"
	$scope.toolFilters = angular.copy(persistentDataService.getToolFilterData());
	$scope.locationEnabled = persistentDataService.isLocationEnabled();
	$scope.currentPosition = persistentDataService.getLastKnownGeoposition();
	$scope.availableToolOrder = apiService.toolsOrder;
	
	var filterBarInstance;
	
	// Si el servicio está activo, cuando se carga el controller se pone a sí mismo como oyente 
	// de los cambios que se produzcan en la localización 
	if($scope.locationEnabled){
		geolocationService.start(onUpdateLocation, onUpdateLocationError);
	}
	
	// Si desde algún otro controller se modifica el estado del servicio activándolo, este controller se pone como oyente
	// de las modificaciones en la geoposición
	$scope.$on('locationEnabled:updated', function(event, data) {
		$scope.locationEnabled = data;
		if($scope.locationEnabled){
			geolocationService.start(onUpdateLocation, onUpdateLocationError);
		}
    });
	
	// lista de herramientas junto con los filtros y la ordenación
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
	
	// botón Cancelar del apartado de Filtros y Ordenación
	$scope.cancelFilters = function() {
 		$scope.toolFilters = angular.copy(persistentDataService.getToolFilterData());
 		$state.go('toolList');
    };
    
    // botón Aceptar del apartado de Filtros y Ordenación
    $scope.acceptFilters = function() {
    	persistentDataService.updateToolFilterData($scope.toolFilters);
    	$state.go('toolList');
    };
    
    // carga en memoria la herramienta cuyo ID se indica como parámetro en la URL
    $scope.loadTool = function(){
    	
    	$scope.tool = apiService.getToolById($stateParams.toolId);
    	$scope.toolTotalPrice = "No indicado";
    	
    	var filters = persistentDataService.getToolFilterData()
		if(filters.dateCheck){
			$scope.toolTotalPrice = ($scope.tool.pricePerDay * filters.days)+ " €";
		}
    }
    
    // función que muestra la caja de búsqueda de herramientas por nombre
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
	
    // activa y desactiva el servicio de geolocalización 
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

	// recibe las actualizaciones en la posición del dispositivo
	function onUpdateLocation(position) {
		$scope.currentPosition = position.coords;
		persistentDataService.updateLastKnownGeoposition($scope.currentPosition);
		//console.log($scope.currentPosition);
	}

	function onUpdateLocationError(error) {
		console.log("Error updating location. Code:"+error.code+" Message:"+error.message);
	}
	
	// muestra el diálogo en la simulación de alquiler de una herramienta
	$scope.rentToolDialog = function() {
		$ionicPopup.confirm({
		     title: 'Alquiler herramienta',
		     template: '¿Confirma que quiere alquilar esta herramienta?'
		   })
		   .then(function(res) {
			   if(res) {
				   $state.go('toolList');
			   } 
	    });
	};
	
}]);
