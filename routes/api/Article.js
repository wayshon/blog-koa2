const router = require('koa-router')();
const { articleController } = require('../../controllers');

router.get('/', (ctx, next) => articleController.getArticleList(ctx, next));
router.get('/:id', (ctx, next) => articleController.getArticleDetail(ctx, next));
router.post('/:id', (ctx, next) => articleController.updateArticle(ctx, next));
router.delete('/:id', (ctx, next) => articleController.deleteArticle(ctx, next));
router.post('/', (ctx, next) => articleController.addArticle(ctx, next));

module.exports = router;