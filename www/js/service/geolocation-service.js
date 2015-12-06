'use strict';

var sharetoolApp = angular.module("sharetoolApp");

sharetoolApp.factory('geolocationService', ['$cordovaGeolocation', function ($cordovaGeolocation) {
		
	var watchOptions = {
	   enableHighAccuracy: true
	};
	
	var watch;
	return {
	  
	  start: function (success, error) {
	    watch = $cordovaGeolocation.watchPosition(watchOptions);
	    watch.then(
		    null,
		    function(err) {
		      // error
		    },
		    function(position) {
		     success(position);
		}); 
	  },
	  
	  stop: function () {
		  watch.clearWatch();
	  }
	};
	
}]);