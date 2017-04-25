(function(){
    
  'use strict';

/* Controllers */

var shopModule = angular.module('ShopModule', ['ShopService']);

shopModule.controller('ShopCtrl', ['$scope','Shop',
  function($scope, Shop) {
    //init product scope
    $scope.product = Shop.query();
    $scope.count = 0;
   
    $scope.product.$promise.then(function(data){
    	$scope.mainImageUrl = data.images[0];
      
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    };
  

    $scope.wantToBuy = function(product) {
        //checking product availability
        if(!product.stock){
           $('.user-notify').modal({
             'fx': 'fadeIn',
             'width': '33%'
         }).show(product.noStockMsg);
    	}
    };

    $scope.decrement = function() {
          $scope.count = $scope.count - 1;
            if ($scope.count < 0){
              $scope.count = 0;
          }
    };

      $scope.increment = function() {
         $scope.count = $scope.count + 1;
      };


  }]);

})();