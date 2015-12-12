/**
 * Permite validar que el email no existe en el sistema cuando se quiere crear un nuevo usuario
 */

'use strict';

var sharetoolApp = angular.module("sharetoolApp");

sharetoolApp.directive('uniqueEmail', ['apiService', function(apiService) {
  return {
    require: 'ngModel',
    link: function(scope, ele, attrs, c) {
      scope.$watch(attrs.ngModel, function(value) {
    	  if(value){
    		  c.$setValidity('unique', !apiService.userExistsByEmail(value));
    	  }
      });
    }
  }
}])