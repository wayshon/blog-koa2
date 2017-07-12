const router = require('koa-router')();

const userController = require('../../controllers/UserController');

router.get('/:id', userController.getUserId);
router.post('/', userController.regist);

module.exports = router;