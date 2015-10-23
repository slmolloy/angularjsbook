describe('Controllers', function() {
  var $scope, ctrl;

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

  describe('ListCtrl', function() {
    var mockBackend;

    beforeEach(inject(function($rootScope, $controller, _$httpBackend_) {
      mockBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      ctrl = $controller('ListCtrl', {
        $scope: $scope,
        recipes: [1, 2, 3]
      });
    }));

    it('should have a list of three recipes', function() {
      expect($scope.recipes).toEqual([1, 2, 3]);
    });
  });

  describe('ViewCtrl', function() {
    var mockBackend, location;

    beforeEach(inject(function($rootScope, $controller, _$httpBackend_, $location) {
      mockBackend = _$httpBackend_;
      location = $location;
      $scope = $rootScope.$new();
      ctrl = $controller('ViewCtrl', {
        $scope: $scope,
        $location: $location,
        recipe: {id: 1, title: 'Cookies'}
      });
    }));

    it('should load a recipe', function() {
      expect($scope.recipe).toEqual({id: 1, title: 'Cookies'});
    });

    it('should edit a recipe', function() {
      expect($scope.recipe).toEqual({id: 1, title: 'Cookies'});
      location.path('/test');
      expect(location.path()).toEqual('/test');
      $scope.edit();
      expect(location.path()).toEqual('/edit/1');
    });
  });

  describe('EditCtrl', function() {
    var mockBackend, location;

    beforeEach(inject(function($rootScope, $controller, _$httpBackend_, $location, Recipe) {
      mockBackend = _$httpBackend_;
      location = $location;
      $scope = $rootScope.$new();
      ctrl = $controller('EditCtrl', {
        $scope: $scope,
        $location: $location,
        recipe: new Recipe({id: 1, title: 'Cookies'})
      });

      location.path('test');

      var recipesRe = /.*\/recipes\/(\w+)$/
      mockBackend.when('POST', recipesRe)
          .respond(function(method, url, params) {
          /*{id:2, title: 'Cookies'}*/
          var recipeId = parseInt(url.replace(recipesRe, '$1'), 10);
          if (recipeId === 1) {
            return [200, {id: recipeId + 1, title: 'Cookies'}];
          } else if (recipeId === 3) {
            return [200, {id: recipeId + 1, title: 'Fries'}];
          } else {
            return [404];
          }
        });
    }));

    it('should save the recipe', function() {
      mockBackend.expectPOST('/recipes/1', {id: 1, title: 'Cookies'});
      $scope.save();
      expect(location.path()).toEqual('/test');
      mockBackend.flush();
      expect(location.path()).toEqual('/view/2');

      mockBackend.expectPOST('/recipes/3', {id: 3, title: 'Fries'});
      location.path('/view/3');
      $scope.recipe.id = 3;
      $scope.recipe.title = 'Fries';
      $scope.save();
      mockBackend.flush();
      expect(location.path()).toEqual('/view/4');
    });

    it('should remove the recipe', function() {
      expect($scope.recipe).toBeTruthy();

      $scope.remove();
      expect($scope.recipe).toBeUndefined();
      expect(location.path()).toEqual('/');
    });
  });
});