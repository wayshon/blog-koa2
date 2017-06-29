const router = require('koa-router')();
const userRouter = require('./User');
const articleRouter = require('./Article');

router.use('/users', userRouter.routes(), userRouter.allowedMethods());
router.use('/articles', articleRouter.routes(), articleRouter.allowedMethods());

module.exports = router;