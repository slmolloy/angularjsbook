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
    beforeEach(inject(function(_$rootScope_, _$controller_) {
      $scope = _$rootScope_.$new();
      $controller = _$controller_('ListCtrl', {
        $scope: $scope,
        recipes: [1, 2, 3]
      });
    }));

    it('should have a list of three recipes', function() {
      expect($scope.recipes).toEqual([1, 2, 3]);
    });
  });

  describe('ViewCtrl', function() {
    beforeEach(inject(function(_$rootScope_, _$controller_, _$location_) {
      $location = _$location_;
      $scope = _$rootScope_.$new();
      $controller = _$controller_('ViewCtrl', {
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
      $location.path('/test');
      expect($location.path()).toEqual('/test');
      $scope.edit();
      expect($location.path()).toEqual('/edit/1');
    });
  });

  describe('EditCtrl', function() {
    beforeEach(inject(function(_$rootScope_, _$controller_, _$httpBackend_, _$location_, Recipe) {
      $httpBackend = _$httpBackend_;
      $location = _$location_;
      $scope = _$rootScope_.$new();
      $controller = _$controller_('EditCtrl', {
        $scope: $scope,
        $location: $location,
        recipe: new Recipe({id: 1, title: 'Cookies'})
      });

      $location.path('test');

      var recipesRe = /.*\/recipes\/(\w+)$/
      $httpBackend.when('POST', recipesRe)
          .respond(function(method, url, params) {
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
      $httpBackend.expectPOST('/recipes/1', {id: 1, title: 'Cookies'});
      $scope.save();
      expect($location.path()).toEqual('/test');
      $httpBackend.flush();
      expect($location.path()).toEqual('/view/2');

      $httpBackend.expectPOST('/recipes/3', {id: 3, title: 'Fries'});
      $location.path('/view/3');
      $scope.recipe.id = 3;
      $scope.recipe.title = 'Fries';
      $scope.save();
      $httpBackend.flush();
      expect($location.path()).toEqual('/view/4');
    });

    it('should remove the recipe', function() {
      expect($scope.recipe).toBeTruthy();

      $scope.remove();
      expect($scope.recipe).toBeUndefined();
      expect($location.path()).toEqual('/');
    });
  });

  describe('NewCtrl', function() {
    beforeEach(inject(function(_$rootScope_, _$controller_, _$httpBackend_, _$location_, Recipe) {
      $httpBackend = _$httpBackend_;
      $location = _$location_;
      $scope = _$rootScope_.$new();
      $controller = _$controller_('NewCtrl', {
        $scope: $scope,
        $location: $location,
        recipe: new Recipe({ingredients: [ {} ]})
      });

      $location.path('test');

      $httpBackend.when('POST', '/recipes')
        .respond(function(params) {
          return [200, {id: 1, title: params.title}]
        });
    }));

    it('should create new recipe', function() {
      $httpBackend.expectPOST('/recipes', {ingredients: [{}]});
      $scope.save();
      expect($location.path()).toEqual('/test');
      $httpBackend.flush();
      expect($location.path()).toEqual('/view/1');
      expect($scope.recipe.id).toEqual(1);
    });
  });

  describe('IngredientsCtrl', function() {
    beforeEach(inject(function(_$rootScope_, _$controller_, Recipe) {
      $scope = _$rootScope_.$new();
      $controller = _$controller_('IngredientsCtrl', {
        $scope: $scope
      });

      $scope.recipe = new Recipe({id: 1, title: 'Cookies', ingredients: []})
    }));

    it('should add new ingredient', function() {
      expect($scope.recipe).toBeDefined();
      expect($scope.recipe.ingredients).toBeDefined();
      $scope.addIngredient();
      expect($scope.recipe.ingredients.length).toEqual(1);
      $scope.addIngredient();
      expect($scope.recipe.ingredients.length).toEqual(2);
    });

    it('should remove ingredient', function() {
      expect($scope.recipe).toBeDefined();
      expect($scope.recipe.ingredients).toBeDefined();
      $scope.addIngredient();
      expect($scope.recipe.ingredients.length).toEqual(1);
      $scope.removeIngredient();
      expect($scope.recipe.ingredients.length).toEqual(0);
    });
  })
});