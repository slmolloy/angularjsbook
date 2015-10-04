// Create AMail module
var aMailService = angular.module('AMail', []);

// Setup mappings between URLs, templates and controllers
function emailRouteConfig($routeProvider) {
  $routeProvider
    .when('/', {
      controller: ListController,
      templateUrl: 'list.html'
    })
    // Specify parameterized URL component with :
    .when('/view/:id', {
      controller: DetailController,
      templateUrl: 'detail.html'
    })
    .otherwise({
      redirectTo: '/'
    });
}

// Set up route so AMail service can find it
aMailService.config(emailRouteConfig);

// Test messages
var testMessages = [{
  id: 0,
  sender: 'joe@shmoe.com',
  subject: 'The message that never ends',
  date: 'Dec 7, 2014 12:32:00',
  recipients: [
    'scott@hi.com'
  ],
  message: 'The message actually does have an ending'
},
{
  id: 1,
  sender: 'sally@smith.com',
  subject: 'What a girl wants',
  date: 'Feb 14, 2015 23:18:00',
  recipients: [
    'themen@men.com'
  ],
  message: 'Not sure, let me know when you figure it out.'
},
{
  id: 2,
  sender: 'scott@awesome.com',
  subject: 'How to rule the world',
  date: 'July 4, 2015 08:03:23',
  recipients: [
    'theworld@yall.com'
  ],
  message: 'Just don\'t even try'
}];

// Publish messages for the list template
function ListController($scope) {
  $scope.messages = testMessages;
}

// Get the message id from the route (pased from the URL) and find the message
function DetailController($scope, $routeParams) {
  $scope.message = testMessages[$routeParams.id];
}