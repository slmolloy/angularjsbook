var router = require('express').Router();

router.use('/', require('./static'));
router.use('/recipes', require('./api/recipes'));

module.exports = router;