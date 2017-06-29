const router = require('koa-router')();
const userRouter = require('./User');
const articleRouter = require('./Article');
const controller = require('../../controllers');
const {utilsController} = controller;

router.use('/users', userRouter.routes(), userRouter.allowedMethods());
router.use('/articles', articleRouter.routes(), articleRouter.allowedMethods());


router.post('/upload', (ctx, next) => utilsController.upload(ctx, next));

module.exports = router;