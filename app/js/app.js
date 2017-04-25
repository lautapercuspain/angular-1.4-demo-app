(function(){
    
 'use strict';

/* App Module */

var phonecatApp = angular.module('shopApp', [
  'ngRoute',
  'ShopModule',
  'ShopService'
]);

phonecatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'app/partials/shop-list.html',
        controller: 'ShopCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);

})();