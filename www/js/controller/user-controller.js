'use strict';

var sharetoolApp = angular.module("sharetoolApp");

sharetoolApp.controller('UserCtrl', ['$scope', '$state', '$ionicPopup', function($scope, $state, $ionicPopup){

	$scope.fdataCreateUser = {};
	$scope.fdataLoginUser = {};
	
	$scope.createUser = function() {
		    
		console.log($scope.fdataCreateUser);
	};
	
	$scope.loginUser = function() {
	    
		console.log($scope.fdataLoginUser);
		
		if($scope.fdataLoginUser.email=='1@1.com'){
			
			$state.go('toolList', {});
		} else {
			
			$scope.showLoginErrorAlert();
		}
		
	};
	
	$scope.showLoginErrorAlert = function() {
	   var loginErrorPopup = $ionicPopup.alert({
	     title: 'Login incorrecto',
	     template: 'El correo electrónico o la clave de acceso no son correctos'
	   });
	};
	 
	
}]);
