const router = require('koa-router')();
const controller = require('../../controllers');
const {userController} = controller;

router.post('/regist', (ctx, next) => userController.regist(ctx, next));
router.post('/login', (ctx, next) => userController.login(ctx, next));

module.exports = router;