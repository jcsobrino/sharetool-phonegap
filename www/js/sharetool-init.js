/*
 * Inicializaciones para el uso de AngularJS 
 */

'use strict';

var sharetoolApp = angular.module('sharetoolApp', ['ui.router', 'ionic','jett.ionic.filter.bar','jcs-autoValidate', 'validation.match']);

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
			templateUrl : 'login.html',
			params: {'userCreatedEmail' : null}
	  }).state('createUser', {
			url : '/createUser',
			templateUrl : 'create-user.html'
	  }).state('menuLeft', {
			url : '/menuLeft',
			templateUrl : 'menu-left.html'
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
  
	// se generan los datos de prueba cada vez que se inicia la aplicación
	apiService.init();
	
	// se ejecuta una vez el sistema se haya iniciado por completo
	$ionicPlatform.ready(function() {
	
		// control para la barra de estado en sistemas iOS
	    if(window.StatusBar) {
	    	StatusBar.styleLightContent();
	    }
	    
	    console.log('ionicPlatform ready!');
    });
});


// permite mostrar los errores de validación en los formularios. Se utiliza en el plugin 'jcs-autoValidate'

sharetoolApp.factory('ionicElementModifier', [
    function () {
        var /**
        * @ngdoc function
        * @name myCustomElementModifier#makeValid
        * @methodOf myCustomElementModifier
        *
        * @description
        * Makes an element appear valid by apply custom styles and child elements.
        *
        * @param {Element} el - The input control element that is the target of the validation.
        */
        makeValid = function (el) {
        	reset(el);
        },
        
        reset = function (el) {
        	el = el.parent();
	        angular.forEach(el.find('span'), function (spanEl) {
	          spanEl = angular.element(spanEl);
	          if (spanEl.hasClass('error-msg')) {
	            spanEl.remove();
	          }
	        });
	
	        el.removeClass('has-error');
        },        
        insertAfter = function (referenceNode, newNode) {
            referenceNode[0].parentNode.insertBefore(newNode[0], referenceNode[0].nextSibling);
        },

        /**
        * @ngdoc function
        * @name myCustomElementModifier#makeInvalid
        * @methodOf myCustomElementModifier
        *
        * @description
        * Makes an element appear invalid by apply custom styles and child elements.
        *
        * @param {Element} el - The input control element that is the target of the validation.
        * @param {String} errorMsg - The validation error message to display to the user.
        */
        makeInvalid = function (el, errorMsg) {
        	reset(el);
        	var helpTextEl = angular.element('<span class="error-msg assertive">' + errorMsg + '</span>');
        	insertAfter(el, helpTextEl);
        	console.log(errorMsg);
        },


        /**
        * @ngdoc function
        * @name myCustomElementModifier#makeDefault
        * @methodOf myCustomElementModifier
        *
        * @description
        * Makes an element appear in its default visual state.
        *
        * @param {Element} el - The input control element that is the target of the validation.
        */
        makeDefault = function (el) {
            // return the element to a default visual state i.e. before any form of validation was applied
        };

        return {
            makeValid: makeValid,
            makeInvalid: makeInvalid,
            makeDefault: makeDefault,
            key: 'ionicElementModifierKey'
        };
    }
]);

sharetoolApp.run(['validator', 'ionicElementModifier', function (validator, ionicElementModifier) {
    validator.registerDomModifier(ionicElementModifier.key, ionicElementModifier);
    validator.setDefaultElementModifier(ionicElementModifier.key);
	}
]);


