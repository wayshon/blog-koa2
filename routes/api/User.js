const router = require('koa-router')();
const userController = require('../../controllers/UserController');

router.get('/', userController.getAllUser);

module.exports = router;