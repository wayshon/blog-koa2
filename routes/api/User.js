const router = require('koa-router')();
const controller = require('../../controllers');
const {userController} = controller;

router.get('/', (ctx, next) => userController.getAllUser(ctx, next));
router.post('/', (ctx, next) => userController.regist(ctx, next));
router.post('/login', (ctx, next) => userController.login(ctx, next));

module.exports = router;