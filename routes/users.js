var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var middlewares = require('../middlewares/authenticate');
/* GET users listing. */


router.post('/',userController.create);



router.get('/list',userController.list);

router.use(middlewares.authenticate);

router.route('/')
      .get(userController.getAll);

router.post('/recommendDish/:id',userController.recommendDish);

router.put('/photo',userController.updatePhoto);

router.route('/:id')
        .get(userController.getOne)
        .put(userController.edit);

router.route('/favorites')
      .post(userController.saveFavorite)
      .get(userController.favorites);
module.exports = router;
