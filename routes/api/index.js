const router = require('koa-router')();
const userRouter = require('./User');
const articleRouter = require('./Article');
const controller = require('../../controllers');
const {utilsController} = controller;

//判断已登录
const checkLogin = async (ctx, next) => {
    if (!ctx.session.user) {
        let err = new Error()
        err.name = "UnauthorizedError";
        err.code = 401;
        throw err;
    } else {
        let user = ctx.session.user;
        ctx.session.user = user;
        await next();
    }
}

router.use('/user', userRouter.routes(), userRouter.allowedMethods());
router.use('/article', articleRouter.routes(), articleRouter.allowedMethods());


router.post('/uploadbase64', (ctx, next) => utilsController.uploadBase64(ctx, next));
router.post('/upload', (ctx, next) => utilsController.upload(ctx, next));

router.get('/setSession', ctx => {
            ctx.session.user = "tom";
            ctx.body = ctx.session;
        })
        .get('/t', ctx => {
            let user = ctx.session.user;
            ctx.session.user = user;
            ctx.body = ctx.session;
        })
        .get('/updateSession', ctx => {
            ctx.session.user = 'john';
            ctx.body = ctx.session;
        })
        .get('/clearSession', ctx => {
            ctx.session = null;
            ctx.body = 'ok';
        });

module.exports = router;