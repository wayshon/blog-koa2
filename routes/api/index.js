const router = require('koa-router')();
const userRouter = require('./User');
const articleRouter = require('./Article');
const controller = require('../../controllers');
const {utilsController} = controller;

router.use('/user', userRouter.routes(), userRouter.allowedMethods());
router.use('/article', articleRouter.routes(), articleRouter.allowedMethods());


router.post('/uploadbase64', (ctx, next) => utilsController.uploadBase64(ctx, next));
router.post('/upload', (ctx, next) => utilsController.upload(ctx, next));

module.exports = router;