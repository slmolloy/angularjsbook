angular.module('myguthub')
.config(function($routeProvider) {
  $routeProvider
  .when('/', {
      controller: 'ListCtrl',
      resolve: {
        recipes: function(MultiRecipeLoader) {
          return MultiRecipeLoader();
        }
      },
      templateUrl: 'list.html'
    })
  .when('/edit/:recipeId', {
      controller: 'EditCtrl',
      resolve: {
        recipe: function(RecipeLoader, $route) {
          return RecipeLoader($route.current.params.recipeId);
        }
      },
      templateUrl: 'formRecipe.html' })
  .when('/view/:recipeId', {
      controller: 'ViewCtrl',
      resolve: {
        recipe: function(RecipeLoader, $route) {
          return RecipeLoader($route.current.params.recipeId);
        }
      },
      templateUrl: 'viewRecipe.html' })
  .when('/new', {
      controller: 'NewCtrl',
      templateUrl: 'formRecipe.html'
    })
    .otherwise({redirectTo: '/'});
});
