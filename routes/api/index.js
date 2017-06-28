const router = require('koa-router')();
const userRouter = require('./User');
// const userController = require('../../controllers/UserController');

// router.post('/regist', userController.regist);
// router.post('/login', (ctx, next) => userController.login(ctx, next));
// router.use('/users', userRouter.routes(), userRouter.allowedMethods());

const controller = require('../../controllers');
const {userController} = controller;

router.post('/regist', (ctx, next) => userController.regist(ctx, next));
router.post('/login', (ctx, next) => userController.login(ctx, next));
router.use('/users', userRouter.routes(), userRouter.allowedMethods());

module.exports = router;