var express = require('express');
var router = express.Router();
var restaurantController = require('../controllers/restaurantController');
var commentController = require('../controllers/commentController');
var middlewares = require('../middlewares/authenticate');

router.get('/locations',restaurantController.getForLocations);
router.get('/autocomplete',restaurantController.autocomplete);
router.get('/search',restaurantController.search);
router.post('/service',restaurantController.addService);
router.get('/service',restaurantController.getService);
router.get('/list',restaurantController.list);

router.get('/generateSlugs',restaurantController.genSlugs);
router.post('/dish',restaurantController.addDish);
router.put('/recommendDish',restaurantController.recommendDish);
router.get('/recommendations',restaurantController.recommendations);
router.get('/feel',middlewares.authenticate, restaurantController.countFeel);

router.post('/notification',middlewares.authenticate,restaurantController.sendNotification);
//router.get('/viewServices',restaurantController.getServicesRest);
router.get('/:id/services',restaurantController.services);
router.post('/',restaurantController.create);

router.get('/',middlewares.authenticate, restaurantController.getAll);
router.post('/seed',restaurantController.seed);
router.post('/chief',restaurantController.createChief);
router.get('/:slug',restaurantController.getProfile);
router.put('/:id',middlewares.authenticate,restaurantController.edit)
router.get('/:id/i',restaurantController.getOne);
router.get('/:id/comments',restaurantController.comments);
router.post('/:id/photos',restaurantController.updatePhotos);
router.get('/edit/:id',restaurantController.editData);
router.post('/edit/chief/:id',restaurantController.updateChiefRestaurant);
router.post('/edit/:id',restaurantController.updateRestaurant);

module.exports = router;
