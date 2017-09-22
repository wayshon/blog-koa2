const router = require('koa-router')();

router.get('/', async (ctx, next) => {
  ctx.body = "blog api"
})

router.get('/eat', async (ctx, next) => {
  await ctx.render('what-eat')
})

router.get('/upload', async (ctx, next) => {
  await ctx.render('upload')
})

module.exports = router;