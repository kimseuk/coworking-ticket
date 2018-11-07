var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ShareEdit - Issue tickets for sharing editor' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'ShareEdit - Issue tickets for sharing editor'});
});

module.exports = router;
