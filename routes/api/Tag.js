const router = require('koa-router')();
const tagController = require('../../controllers/TagController');

router.get('/', tagController.getList);



module.exports = router;