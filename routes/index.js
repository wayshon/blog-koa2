const router = require('koa-router')();

router.get('/', async (ctx, next) => {
  ctx.body = "blog api"
})

module.exports = router;