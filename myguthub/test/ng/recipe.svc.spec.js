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
    var mockBackend, loader;

    beforeEach(inject(function(_$httpBackend_, MultiRecipeLoader) {
      mockBackend = _$httpBackend_;
      loader = MultiRecipeLoader;
    }));

    it('should load a list of recipes', function() {
      mockBackend.when('GET', '/recipes').respond([{id: 1}, {id: 2}]);
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

    it('should fail to load list of recipes', function() {
      mockBackend.when('GET', '/recipes').respond(500);
      mockBackend.expectGET('/recipes');

      var recipes, errMsg;
      var promise = loader();
      promise.then(function(res) {
        recipes = res;
      }, function(err) {
        errMsg = err;
      });

      expect(recipes).toBeUndefined();
      mockBackend.flush();
      expect(recipes).toBeUndefined();
      expect(errMsg).toBeDefined();
      expect(errMsg).toEqual('Unable to fetch recipes');
    });
  });

  describe('RecipeLoader', function() {
    var mockBackend, location, loader;

    beforeEach(inject(function(_$httpBackend_, _$location_, RecipeLoader) {
      mockBackend = _$httpBackend_;
      location = _$location_;
      loader = RecipeLoader;
    }));

    it('should load single recipe', function() {
      location.path('/view/1');
      expect(location.path()).toBe('/view/1');

      mockBackend.when('GET', '/recipes/1').respond({id: 1, title: 'Cookies'});
      mockBackend.expectGET('/recipes/1');
      mockBackend.expectGET('viewRecipe.html').respond('viewRecipe');

      var recipe;
      var promise = loader(1);
      promise.then(function(res) {
        recipe = res;
      });

      expect(recipe).toBeUndefined();
      mockBackend.flush();
      expect(recipe).toEqualData({id: 1, title: 'Cookies'});
    });

    it('should fail to load recipe', function() {
      location.path('/view/1');
      expect(location.path()).toBe('/view/1');

      mockBackend.when('GET', '/recipes/1').respond(500);
      mockBackend.expectGET('/recipes/1');
      mockBackend.expectGET('viewRecipe.html').respond('viewRecipe');

      var recipe, errMsg;
      var promise = loader(1);
      promise.then(function(res) {
        recipe = res;
      }, function(err) {
        errMsg = 'Failed to load recipe';
      });

      expect(recipe).toBeUndefined();
      expect(errMsg).toBeUndefined();
      mockBackend.flush();
      expect(recipe).toBeUndefined();
      expect(errMsg).toEqual('Failed to load recipe');
    });

    it('should load single recipe to edit', function() {
      location.path('/edit/1');
      expect(location.path()).toBe('/edit/1');

      mockBackend.when('GET', '/recipes/1').respond({id: 1, title: 'Cookies'});
      mockBackend.expectGET('/recipes/1');
      mockBackend.expectGET('formRecipe.html').respond('formRecipe');

      var recipe;
      var promise = loader(1);
      promise.then(function(res) {
        recipe = res;
      });

      expect(recipe).toBeUndefined();
      mockBackend.flush();
      expect(recipe).toEqualData({id: 1, title: 'Cookies'});
    });
  });

});