'use strict';

var sharetoolApp = angular.module("sharetoolApp");

sharetoolApp.controller('UserCtrl', ['$scope', '$state', '$ionicPopup', 'apiService', function($scope, $state, $ionicPopup, apiService){

	$scope.fdataCreateUser = {};
	$scope.fdataLoginUser = {};
	
	$scope.createUser = function() {
		    
		console.log($scope.fdataCreateUser);
		
		var name = $scope.fdataCreateUser.name;
		var email = $scope.fdataCreateUser.email;
		var password = $scope.fdataCreateUser.password; 
		
		apiService.createUser(name, email, password);
		
		$state.go('login', {});
	};
	
	$scope.loginUser = function() {
	    
		var user = apiService.login($scope.fdataLoginUser.email, $scope.fdataLoginUser.password);
		
		if(user != null){
			$state.go('toolList', {});
		} else {
			$scope.showLoginErrorAlert();
		}
	};
	
	$scope.showLoginErrorAlert = function() {
	   var loginErrorPopup = $ionicPopup.alert({
	     title: 'Error',
	     template: 'El correo electrónico o la clave de acceso no son correctos'
	   });
	};
	 
	
}]);
