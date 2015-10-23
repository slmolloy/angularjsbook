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
    var mockBackend, recipe;

    beforeEach(inject(function($rootScope, $controller, _$httpBackend_, Recipe) {
      recipe = Recipe;
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

  describe('MultiRecipeLoader', function() {
    var mockBackend, recipe, loader;

    beforeEach(inject(function(_$httpBackend_, Recipe, MultiRecipeLoader) {
      recipe = Recipe;
      mockBackend = _$httpBackend_;
      loader = MultiRecipeLoader;

      mockBackend.when('GET', '/recipes').respond([{id: 1}, {id: 2}]);
    }));

    it('should load a list of recipes', function() {
      mockBackend.expectGET('/recipes');

      var recipes;

      var promise = loader();
      promise.then(function(res) {
        recipes = res;
      });

      expect(recipes).toBeUndefined();

      mockBackend.flush();

      expect(recipes).toEqualData([{id: 1}, {id: 2}]);
    });
  });

  describe('ViewCtrl', function() {
    var mockBackend, recipe, location;

    beforeEach(inject(function($rootScope, $controller, _$httpBackend_, Recipe, $location) {
      recipe = Recipe;
      mockBackend = _$httpBackend_;
      location = $location;
      $scope = $rootScope.$new();
      ctrl = $controller('ViewCtrl', {
        $scope: $scope,
        $location: $location,
        recipe: {id: 1, title: "Cookies"}
      });
    }));

    it('should load a recipe', function() {
      expect($scope.recipe).toEqual({id: 1, title: "Cookies"});
    });

    it('should edit a recipe', function() {
      expect($scope.recipe).toEqual({id: 1, title: "Cookies"});
      location.path('/test');
      expect(location.path()).toEqual('/test');
      $scope.edit();
      expect(location.path()).toEqual('/edit/1');
    });
  });
});