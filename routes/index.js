var express = require('express');
var router = express.Router();
var restaurants = require('./restaurants');
var users = require('./users');
var comments = require('./comments');

var userController = require('../controllers/userController');

router.get('/', function(req, res, next) {
  res.send('API YARQAY')
});
router.post('/login',userController.loginUser);
router.post('/login/restaurant',userController.loginRestaurant);
router.use('/restaurants',restaurants);
router.use('/users',users);
router.use('/comments',comments);

module.exports = router;
