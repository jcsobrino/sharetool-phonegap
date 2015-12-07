'use strict';

var sharetoolApp = angular.module('sharetoolApp', ['ui.router', 'ngCordova', 'ionic', 'jcs-autoValidate']);

sharetoolApp.run([
    'defaultErrorMessageResolver',
    function (defaultErrorMessageResolver) {
       
        defaultErrorMessageResolver.setI18nFileRootPath('js/lang');
        defaultErrorMessageResolver.setCulture('es-ES');
    }
]);

sharetoolApp.config(function($stateProvider, $urlRouterProvider) {
	 
	  $urlRouterProvider.otherwise("/toolList");
	 
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
			url : '/toolDetail/{toolId}',
			templateUrl : 'tool-detail.html'
	  }).state('filterTool', {
			url : '/filterTool',
			templateUrl : 'tool-filters.html'
	  })
	  
});


sharetoolApp.run(function($ionicPlatform, apiService) {
  
	apiService.init();
	
	$ionicPlatform.ready(function() {
		
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
        
        
        
    });
});