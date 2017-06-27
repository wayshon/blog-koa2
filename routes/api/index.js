const router = require('koa-router')();
const userRouter = require('./User');
const userController = require('../../controllers/UserController');

router.post('/regist', userController.regist);
router.post('/login', userController.login);
router.use('/users', userRouter.routes(), userRouter.allowedMethods());

module.exports = router;