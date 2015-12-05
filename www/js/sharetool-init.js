'use strict';

var sharetoolApp = angular.module('sharetoolApp', ['ui.router', 'ionic', 'jcs-autoValidate']);

sharetoolApp.run([
    'defaultErrorMessageResolver',
    function (defaultErrorMessageResolver) {
       
        defaultErrorMessageResolver.setI18nFileRootPath('js/lang');
        defaultErrorMessageResolver.setCulture('es-ES');
    }
]);

sharetoolApp.config(function($stateProvider, $urlRouterProvider) {
	 
	  $urlRouterProvider.otherwise("/login");
	 
	  $stateProvider.state('login', {
			url : '/login',
			templateUrl : 'login.html'
	  }).state('createUser', {
			url : '/createUser',
			templateUrl : 'create-user.html'
	  }).state('toolList', {
			url : '/toolList',
			templateUrl : 'tool-list.html'
	  }).state('toolDetail', {
			url : '/toolDetail',
			templateUrl : 'tool-detail.html'
	  })
	  
});