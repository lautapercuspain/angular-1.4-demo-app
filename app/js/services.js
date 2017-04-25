(function(){
    
  'use strict';


var shopServices = angular.module('ShopService', ['ngResource']);

shopServices.factory('Shop', ['$resource',
  function($resource){
    return $resource('app/data/smartv.json', {}, {
      query: {method:'GET', params:{}, isArray:false}
    });
  }]);

})();