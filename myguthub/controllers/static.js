var express = require('express');
var favicon = require('express-favicon');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../layouts', 'app.html'))
});

router.use('/', express.static(path.join(__dirname, '../assets')));

router.use(express.static(path.join(__dirname, '../views')));

router.use(favicon(path.join(__dirname, '../assets/favicon.ico')));

module.exports = router;
