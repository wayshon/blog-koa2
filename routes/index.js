const router = require('koa-router')();

router.get('/', (ctx, next) => {
  throw new Error(500, 'hahaha')
  ctx.body = {
    msg: '哦'
  }
})

module.exports = router;