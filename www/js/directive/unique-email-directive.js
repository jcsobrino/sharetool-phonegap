'use strict';

var sharetoolApp = angular.module("sharetoolApp");

sharetoolApp.directive('uniqueEmail', [ function() {
  return {
    require: 'ngModel',
    link: function(scope, ele, attrs, c) {
      scope.$watch(attrs.ngModel, function(value) {
       
     	  c.$setValidity('unique', value != '1@1.com');
 
      });
    }
  }
}])