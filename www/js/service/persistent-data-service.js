/**
 * Mantiene información que debe ser almacenada durante la sesión del usuario y que se utiliza en varias 
 * vistas de la aplicación. Lo ideal es que se guardase en el servicio de persistencia de HTML5 para que
 * recargas en las páginas no la hagan desaparecer.
 */

'use strict';

var sharetoolApp = angular.module("sharetoolApp");

sharetoolApp.factory('persistentDataService', ['$rootScope', 'apiService', function ($rootScope, apiService) {
	
	// valores de la página de filtros de herramientas
	var toolFilterData = {
		toolOrder:apiService.toolsOrder.MIN_PRICE,
		maxPriceCheck:false,
		dateCheck:false,
		date: new Date(),
		maxDistanceCheck:false,
		maxDistance:50
	};
	
	// almacena los datos del usuario logado en el sistema
	var userSession = null;
	// última posición geográfica conocida
	var lastKnownGeoposition = null;
	// indica que el servico de geolocalización está o no activo
	var locationEnabled = false;
	
	return {
	  
	  getToolFilterData: function () {
	    return toolFilterData;
	  },
	  updateToolFilterData: function (data) {
		  toolFilterData = angular.copy(data);
	  },
	  getLastKnownGeoposition: function(){
		  return lastKnownGeoposition;
	  },
	  updateLastKnownGeoposition: function(geoposition){
		  lastKnownGeoposition = geoposition;
	  },
	  isLocationEnabled: function(){
		  return locationEnabled;
	  },
	  setLocationEnabled: function(enabled){
		  locationEnabled = enabled;
		  // si el servicio de geolocalización cambia de estado se informa a todos los oyentes de esta propiedad
		  $rootScope.$broadcast('locationEnabled:updated', enabled);
	  },
	  getUserSession: function(){
		  return userSession;
	  },
	  setUserSession: function(user){
		  $rootScope.menuLeftEnabled = (user != null);
		  userSession = user;
	  },
	  isUserLogged: function(){
		  return userSession != null;
	  }
	};
	
}]);