/**
 * Servicio con las funciones relacionadas con la gestión de usuarios
 */

'use strict';

var sharetoolApp = angular.module("sharetoolApp");

sharetoolApp.controller('UserCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$ionicPopup', 'apiService', 'persistentDataService', function($scope, $rootScope, $state, $stateParams, $ionicPopup, apiService, persistentDataService){

	$scope.fdataCreateUser = {};
	$scope.fdataLoginUser = {email : $stateParams.userCreatedEmail};
	//$scope.fdataLoginUser = {email : 'wholmes@host.com', password:'password1'};

	// función para crear un nuevo usuario
	$scope.createUser = function() {
		     
		var name = $scope.fdataCreateUser.name;
		var email = $scope.fdataCreateUser.email;
		var password = $scope.fdataCreateUser.password; 
		
		apiService.simulateDelay(function(){
			apiService.createUser(name, email, password);
		
			$ionicPopup.alert({
				title: 'Usuario creado',
			    template: 'Indique sus datos para iniciar la sesión'
		    }).then(function(res) {
			   $state.go('login', {"userCreatedEmail" : email});
		    });
		
		});
	};
	
	// ejecuta el protocolo de login en el sistema
	$scope.loginUser = function() {
		
		apiService.simulateDelay(function(){
			var user = apiService.login($scope.fdataLoginUser.email, $scope.fdataLoginUser.password);

			if(user != null){				
				persistentDataService.setUserSession(user);
				$state.go('toolList');
			} else {
				$scope.showLoginErrorAlert();
			}		
		});
	};
	
	// lleva a cabo el logout del usuario
	$scope.logoutUser = function() {
		
		persistentDataService.setUserSession(null);
		$state.go('login');
	}
	
	// devuelve los datos del usuario que está logado en el sistema
	$scope.getUserSession = function() {
		
		return persistentDataService.getUserSession();
	}
	
	// muestra una ventana que indica que las credenciales no son correctas durante el proceso de login
	$scope.showLoginErrorAlert = function() {
	   var loginErrorPopup = $ionicPopup.alert({
	     title: 'Error',
	     template: 'El correo electrónico o la clave de acceso no son correctos'
	   });
	};
	 
	
}]);
