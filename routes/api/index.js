const router = require('koa-router')();
const userRouter = require('./User');
const articleRouter = require('./Article');
const commentRouter = require('./Comment');
const praiseRouter = require('./Praise');
const tagRouter = require('./Tag');

const utilsController = require('../../controllers/UtilsController');
const userController = require('../../controllers/UserController');
const articleController = require('../../controllers/ArticleController');

router.use('/user', userRouter.routes(), userRouter.allowedMethods());
router.use('/article', articleRouter.routes(), articleRouter.allowedMethods());
router.use('/:article_id/comment', commentRouter.routes(), commentRouter.allowedMethods());
router.use('/:article_id/praise', praiseRouter.routes(), praiseRouter.allowedMethods());
router.use('/tag', tagRouter.routes(), tagRouter.allowedMethods());


router.post('/uploadbase64', (ctx, next) => utilsController.uploadBase64(ctx, next));
router.post('/upload', (ctx, next) => utilsController.upload(ctx, next));

router.get('/:user_id/article', articleController.getListByUserId);

router.post('/login', userController.login);

module.exports = router;