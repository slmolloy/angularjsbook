var services = angular.module('myguthub.services', ['ngResource']);

services.factory('Recipe', function($resource) {
  return $resource('/recipes/:id', {id: '@id'})
});

services.factory('MultiRecipeLoader', function(Recipe, $q) {
  return function() {
    var delay = $q.defer();
    Recipe.query(function(recipes) {
      delay.resolve(recipes);
    }, function() {
      delay.reject('Unable to fetch recipes');
    });
    return delay.promise;
  };
});

services.factory('RecipeLoader', function(Recipe, $route, $q) {
  return function(recipeId) {
    var delay = $q.defer();
    Recipe.get({id: recipeId}, function(recipe) {
      delay.resolve(recipe);
    }, function() {
      delay.reject('Unable to fetch recipe' + recipeId);
    });
    return delay.promise;
  };
});