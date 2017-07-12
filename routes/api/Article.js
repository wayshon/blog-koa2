const router = require('koa-router')();
const articleController = require('../../controllers/ArticleController');

const filterApiAuth = require('../../middlewares/FilterApiAuth')

router.post('/', filterApiAuth);
router.post('/', articleController.add);

router.delete('/:id', filterApiAuth);
router.delete('/:id', articleController.remove);

router.put('/:id', filterApiAuth);
router.put('/:id', articleController.modify);

router.get('/:id', articleController.getById);

router.get('/', articleController.getList);

//接口需重新规范
router.post('/tag', articleController.getByTags);



module.exports = router;