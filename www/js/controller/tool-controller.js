'use strict';

var sharetoolApp = angular.module("sharetoolApp");

sharetoolApp.controller('ToolCtrl', ['$scope', '$ionicHistory', function($scope, $ionicHistory){

	$scope.toolList =[];
	
	for(var i=0;i<50;i++){
		$scope.toolList.push({"id":i,"name":"Nombre "+i,lat:50.23,lng:21.2,price:3.23});
	}
	
	 
	
}]);
