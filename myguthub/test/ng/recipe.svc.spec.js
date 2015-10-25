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
    var loader;

    beforeEach(inject(function(_$httpBackend_, MultiRecipeLoader) {
      $httpBackend = _$httpBackend_;
      loader = MultiRecipeLoader;
    }));

    it('should load a list of recipes', function() {
      $httpBackend.when('GET', '/recipes').respond([{id: 1}, {id: 2}]);
      $httpBackend.expectGET('/recipes');

      var recipes;
      var promise = loader();
      promise.then(function(res) {
        recipes = res;
      });

      expect(recipes).toBeUndefined();
      $httpBackend.flush();
      expect(recipes).toEqualData([{id: 1}, {id: 2}]);
    });

    it('should fail to load list of recipes', function() {
      $httpBackend.when('GET', '/recipes').respond(500);
      $httpBackend.expectGET('/recipes');

      var recipes, errMsg;
      var promise = loader();
      promise.then(function(res) {
        recipes = res;
      }, function(err) {
        errMsg = err;
      });

      expect(recipes).toBeUndefined();
      $httpBackend.flush();
      expect(recipes).toBeUndefined();
      expect(errMsg).toBeDefined();
      expect(errMsg).toEqual('Unable to fetch recipes');
    });
  });

  describe('RecipeLoader', function() {
    var loader;

    beforeEach(inject(function(_$httpBackend_, _$location_, RecipeLoader) {
      $httpBackend = _$httpBackend_;
      $location = _$location_;
      loader = RecipeLoader;
    }));

    it('should load single recipe', function() {
      $location.path('/view/1');
      expect($location.path()).toBe('/view/1');

      $httpBackend.when('GET', '/recipes/1').respond({id: 1, title: 'Cookies'});
      $httpBackend.expectGET('/recipes/1');
      $httpBackend.expectGET('viewRecipe.html').respond('viewRecipe');

      var recipe;
      var promise = loader(1);
      promise.then(function(res) {
        recipe = res;
      });

      expect(recipe).toBeUndefined();
      $httpBackend.flush();
      expect(recipe).toEqualData({id: 1, title: 'Cookies'});
    });

    it('should fail to load recipe', function() {
      $location.path('/view/1');
      expect($location.path()).toBe('/view/1');

      $httpBackend.when('GET', '/recipes/1').respond(500);
      $httpBackend.expectGET('/recipes/1');
      $httpBackend.expectGET('viewRecipe.html').respond('viewRecipe');

      var recipe, errMsg;
      var promise = loader(1);
      promise.then(function(res) {
        recipe = res;
      }, function(err) {
        errMsg = 'Failed to load recipe';
      });

      expect(recipe).toBeUndefined();
      expect(errMsg).toBeUndefined();
      $httpBackend.flush();
      expect(recipe).toBeUndefined();
      expect(errMsg).toEqual('Failed to load recipe');
    });

    it('should load single recipe to edit', function() {
      $location.path('/edit/1');
      expect($location.path()).toBe('/edit/1');

      $httpBackend.when('GET', '/recipes/1').respond({id: 1, title: 'Cookies'});
      $httpBackend.expectGET('/recipes/1');
      $httpBackend.expectGET('formRecipe.html').respond('formRecipe');

      var recipe;
      var promise = loader(1);
      promise.then(function(res) {
        recipe = res;
      });

      expect(recipe).toBeUndefined();
      $httpBackend.flush();
      expect(recipe).toEqualData({id: 1, title: 'Cookies'});
    });
  });
});