var express = require('express');
var router = express.Router();
var commentController = require('../controllers/commentController');
var middlewares = require('../middlewares/authenticate');

/* GET users listing. */
// router.get('/comments/ranking', commentController.getRanking);

router.use(middlewares.authenticate);

router.route('/')
        .post(commentController.create);



router.route('/:id')
      .put(commentController.edit)
      .delete(commentController.delete);
router.route('/:id/reaction')
        .post(commentController.addReaction);


module.exports = router;
