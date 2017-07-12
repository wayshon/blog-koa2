const router = require('koa-router')();
const praiseController = require('../../controllers/PraiseController');

const filterApiAuth = require('../../middlewares/FilterApiAuth')

router.post('/', filterApiAuth);
router.post('/', praiseController.add);

router.delete('/', filterApiAuth);
router.delete('/', praiseController.remove);

router.get('/', praiseController.getList);



module.exports = router;