const router = require('koa-router')();
// const userController = require('../../controllers/UserController');

// router.get('/', userController.getAllUser);

const controller = require('../../controllers');
const {userController} = controller;

router.get('/', (ctx, next) => userController.getAllUser(ctx, next));

module.exports = router;