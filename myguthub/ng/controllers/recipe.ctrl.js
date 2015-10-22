var controllers = angular.module('myguthub.controllers', ['myguthub.directives', 'myguthub.services']);

controllers.controller('ListCtrl', function($scope, recipes) {
  $scope.recipes = recipes;
});

controllers.controller('ViewCtrl', function($scope, $location, recipe) {
  $scope.recipe = recipe;

  $scope.edit = function() {
    $location.path('/edit/' + recipe.id);
  };
});

controllers.controller('EditCtrl', function($scope, $location, recipe) {
  $scope.recipe = recipe;

  $scope.save = function() {
    $scope.recipe.$save(function(recipe) {
      $location.path('/view/' + recipe.id);
    });
  };

  $scope.remove = function() {
    delete $scope.recipe;
    $location.path('/');
  };
});

controllers.controller('NewCtrl', function($scope, $location, Recipe) {
  $scope.recipe = new Recipe({
    ingredients: [ {} ]
  });

  $scope.save = function() {
    $scope.recipe.$save(function(recipe) {
      $location.path('/view/' + recipe.id);
    });
  };
});

controllers.controller('IngredientsCtrl', function($scope) {
  $scope.addIngredient = function() {
    var ingredients = $scope.recipe.ingredients;
    ingredients[ingredients.length] = {};
  };

  $scope.removeIngredient = function(index) {
    $scope.recipe.ingredients.splice(index, 1)
  };
});