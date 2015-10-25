describe('Routes', function() {
  beforeEach(module('myguthub'));
  beforeEach(function() {
    jasmine.addMatchers({
      toEqualData: function(expected) {
        return {
          compare: function(actual, expected) {
            return { pass: angular.equals(actual, expected) };
          }
        }
      }
    });
  });

  beforeEach(inject(function(_$route_, _$rootScope_, _$location_, _$httpBackend_) {
    $route = _$route_;
    $rootScope = _$rootScope_;
    $location = _$location_;
    $httpBackend = _$httpBackend_;
  }));

  describe('Main Route', function() {
    beforeEach(function() {
      $httpBackend.when('GET', 'list.html').respond('list');
      $httpBackend.when('GET', '/recipes').respond([1, 2, 3]);
    });

    it('should navigate to main page', function() {
      $rootScope.$apply(function() {
        $location.path('/');
      });

      expect($location.path()).toBe('/');
      expect($route.current.templateUrl).toBe('list.html');
      expect($route.current.controller).toBe('ListCtrl');
    });
  });

  describe('Edit Route', function() {
    beforeEach(function() {
      $httpBackend.when('GET', 'formRecipe.html').respond('formRecipe');
      $httpBackend.when('GET', '/recipes/1').respond({id: 1});
    });

    it('should navigate to edit page', function() {
      $rootScope.$apply(function() {
        $location.path('/edit/1');
      });

      expect($location.path()).toBe('/edit/1');
      expect($route.current.templateUrl).toBe('formRecipe.html');
      expect($route.current.controller).toBe('EditCtrl');
    });
  });

  describe('View Route', function() {
    beforeEach(function() {
      $httpBackend.when('GET', 'viewRecipe.html').respond('viewRecipe');
      $httpBackend.when('GET', '/recipes/1').respond({id: 1});
    });

    it('should navigate to view page', function() {
      $rootScope.$apply(function() {
        $location.path('/view/1');
      });

      expect($location.path()).toBe('/view/1');
      expect($route.current.templateUrl).toBe('viewRecipe.html');
      expect($route.current.controller).toBe('ViewCtrl');
    });
  });

  describe('New Route', function() {
    beforeEach(function() {
      $httpBackend.when('GET', 'formRecipe.html').respond('formRecipe');
    });

    it('should navigate to view page', function() {
      $rootScope.$apply(function() {
        $location.path('/new');
      });

      expect($location.path()).toBe('/new');
      expect($route.current.templateUrl).toBe('formRecipe.html');
      expect($route.current.controller).toBe('NewCtrl');
    });
  });
});