const router = require('koa-router')();

router.get('/', (ctx, next) => {
  let a = ''
  a.big().charAt()
  ctx.body = {
    msg: '哦'
  }
})

module.exports = router;