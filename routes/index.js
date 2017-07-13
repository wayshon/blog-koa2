const router = require('koa-router')();

router.get('/', async (ctx, next) => {
  await ctx.render('what-eat')
})

module.exports = router;