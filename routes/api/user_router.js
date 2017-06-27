const router = require('koa-router')();
const userController = require('../../app/controller').user;

router.post('/', (ctx, next) => userController.login(ctx, next));

router.get('/test', function (ctx, next) {
  ctx.body = 'this is a users/test response'
})

module.exports = router
