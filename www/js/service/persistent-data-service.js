'use strict';

var sharetoolApp = angular.module("sharetoolApp");

sharetoolApp.factory('persistentDataService', ['$rootScope', 'apiService', function ($rootScope, apiService) {
		
	var toolFilterData = {
		toolOrder:apiService.toolsOrder.MIN_PRICE,
		maxPriceCheck:false,
		dateCheck:false,
		maxDistanceCheck:false,
		maxDistance:50
	};
	
	var userSession = null;
	var lastKnownGeoposition = null;
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