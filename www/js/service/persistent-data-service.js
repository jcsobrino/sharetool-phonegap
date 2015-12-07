'use strict';

var sharetoolApp = angular.module("sharetoolApp");

sharetoolApp.factory('persistentDataService', ['apiService', function (apiService) {
		
	var toolFilterData = {
		toolOrder:apiService.toolsOrder.MIN_PRICE,
		maxPriceCheck:false,
		dateCheck:false,
		maxDistanceCheck:false	
	};
	
	return {
	  
	  getToolFilterData: function () {
	    return toolFilterData;
	  },
	  updateToolFilterData: function (data) {
		  toolFilterData = angular.copy(data);
	  }
	};
	
}]);