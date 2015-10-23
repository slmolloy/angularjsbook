describe('Services', function() {

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

});