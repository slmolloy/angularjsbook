var directives = angular.module('myguthub.directives', []);

directives.directive('butterbar', function($rootScope) {
  return {
    link: function(scope, element, attrs) {
      element.addClass('hide');

      $rootScope.$on('$routeChangeStart', function() {
        element.removeClass('hide');
      });

      $rootScope.$on('$routeChangeSuccess', function() {
        element.addClass('hide');
      });
    }
  };
});

directives.directive('focus', function($timeout) {
  return {
    link: function(scope, element) {
      $timeout(function() {
        element[0].focus();
      });
    }
  };
});