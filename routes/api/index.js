const router = require('koa-router')();
const userRouter = require('./User');

router.use('/users', userRouter.routes(), userRouter.allowedMethods());

module.exports = router;