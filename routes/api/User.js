const router = require('koa-router')();

const userController = require('../../controllers/UserController');

router.get('/:id', userController.getUserId);
router.post('/', userController.regist);
router.post('/login', userController.login);

module.exports = router;