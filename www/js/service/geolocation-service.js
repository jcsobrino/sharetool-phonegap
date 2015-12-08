'use strict';

var sharetoolApp = angular.module("sharetoolApp");

sharetoolApp.factory('geolocationService', [function () {
	
	var watchId;
	return {
	  
	  start: function (success, error) {
	    watchId = navigator.geolocation.watchPosition(success, error);
	  },
	  
	  stop: function () {
	    if (watchId) {
	       navigator.geolocation.clearWatch(watchId);
	    }
	  }
	
	};
	
}]);