const router = require('koa-router')();

router.get('/', (ctx, next) => {
  ctx.body = {
    msg: '哦'
  }
})

module.exports = router;