var appModule = angular.module('myApp', []);

appModule.controller('MotherOfAllController', function($scope) {
  $scope.message = { text: 'nothing happening yet' };

  $scope.clickUnfocused = function() {
    $scope.message.text = 'unfocused clicked';
  };

  $scope.clickFocused = function() {
    $scope.message.text = 'focused click';
  };
});

appModule.directive('ngbkFocus', function() {
  return {
    link: function(scope, element, attrs, controller) {
      element[0].focus();
    }
  };
});