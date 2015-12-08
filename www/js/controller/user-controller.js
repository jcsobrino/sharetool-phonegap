'use strict';

var sharetoolApp = angular.module("sharetoolApp");

sharetoolApp.controller('UserCtrl', ['$scope', '$state', '$stateParams', '$ionicPopup', 'apiService', function($scope, $state, $stateParams, $ionicPopup, apiService){

	$scope.fdataCreateUser = {};
	$scope.fdataLoginUser = {email : $stateParams.userCreatedEmail};
	
	$scope.createUser = function() {
		     
		var name = $scope.fdataCreateUser.name;
		var email = $scope.fdataCreateUser.email;
		var password = $scope.fdataCreateUser.password; 
		
		apiService.simulateDelay(function(){
			apiService.createUser(name, email, password);
		
			$ionicPopup.alert({
				title: 'Usuario creado',
			    template: 'Indique sus credenciales para iniciar la sesion'
		    }).then(function(res) {
			   $state.go('login', {"userCreatedEmail" : email});
		    });
		
		});
	};
	
	$scope.loginUser = function() {
		
		apiService.simulateDelay(function(){
			var user = apiService.login($scope.fdataLoginUser.email, $scope.fdataLoginUser.password);

			if(user != null){
				$state.go('toolList', {});
			} else {
				$scope.showLoginErrorAlert();
			}		
		});
	};
	
	$scope.showLoginErrorAlert = function() {
	   var loginErrorPopup = $ionicPopup.alert({
	     title: 'Error',
	     template: 'El correo electrónico o la clave de acceso no son correctos'
	   });
	};
	 
	
}]);
