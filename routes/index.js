const router = require('koa-router')();

router.get('/', (ctx, next) => {
  await ctx.render('what-eat')
})

module.exports = router;