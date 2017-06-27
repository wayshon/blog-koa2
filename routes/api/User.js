const router = require('koa-router')();
const userController = require('../../controllers/UserController');

router.get('/all', userController.getAllUser);

module.exports = router;