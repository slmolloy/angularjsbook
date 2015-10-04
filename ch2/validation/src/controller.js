var myAppModule = angular.module('myApp', []);

myAppModule.controller('AddUserController', function($scope) {
  $scope.message = '';

  $scope.addUser = function() {
    $scope.message = 'Thanks, ' + $scope.user.first + ', we added you!';
  };
});