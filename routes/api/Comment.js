const router = require('koa-router')();
const commentController = require('../../controllers/CommentController');

const filterApiAuth = require('../../middlewares/FilterApiAuth')

router.post('/', filterApiAuth);
router.post('/', commentController.add);

router.delete('/:id', filterApiAuth);
router.delete('/:id', commentController.remove);

router.get('/', commentController.getList);



module.exports = router;