const router = require('koa-router')();
const userRouter = require('./User');
const articleRouter = require('./Article');
const commentRouter = require('./Comment');
const tagRouter = require('./Tag');

const utilsController = require('../../controllers/UtilsController');
const articleController = require('../../controllers/ArticleController');

router.use('/user', userRouter.routes(), userRouter.allowedMethods());
router.use('/article', articleRouter.routes(), articleRouter.allowedMethods());
router.use('/:articleId/comment', commentRouter.routes(), commentRouter.allowedMethods());
router.use('/tag', tagRouter.routes(), tagRouter.allowedMethods());


router.post('/uploadbase64', (ctx, next) => utilsController.uploadBase64(ctx, next));
router.post('/upload', (ctx, next) => utilsController.upload(ctx, next));

router.get('/:userId/article', articleController.getListByUserId);

module.exports = router;