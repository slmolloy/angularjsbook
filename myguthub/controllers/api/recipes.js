var router = require('express').Router();
var sleep = require('sleep');

var recipes = [
  {
    id: 1,
    title: 'Cookies',
    description: 'My Grandma\'s cookies',
    ingredients: [{
        amount: 1000,
        amountUnits: 'chips',
        ingredientName: 'Chocolate Chips'
      },{
        amount: 1,
        amountUnits: 'lbs',
        ingredientName: 'Cookie Dough'
      }
    ],
    instructions: 'Cook it like it\'s hot!'
  },{
    id: 2,
    title: 'Hot Dogs',
    description: 'Little hot dogs',
    ingredients: [{
      amount: 1,
      amountUnits: 'piece',
      ingredientName: 'Scott\'s Little Dogs'
    },{
      amount: 1,
      amountUnits: 'piece',
      ingredientName: 'Hot Dog Bun'
    },{
      amount: 1,
      amountUnits: 'oz',
      ingredientName: 'Ketchup'
    },{
      amount: 1,
      amountUnits: 'oz',
      ingredientName: 'Mustard'
    },{
      amount: 1,
      amountUnits: 'oz',
      ingredientName: 'Relish'
    }],
    instructions: 'Put it all on the grill and wait. Then put the hot dog in the bun and enjoy.'
  }
];

router.get('/', function(req, res, next) {
  // Simulate server call time
  sleep.usleep(500000);
  res.json(recipes);
});

router.get('/:id', function(req, res, next) {
  // Simulate server call time
  sleep.usleep(500000);
  res.json(recipes[req.params.id - 1]);
});

module.exports = router;