const router = require('koa-router')();

const { graphqlKoa } = require('graphql-server-koa');

const schema = require('../../schema');

router.post('/', graphqlKoa({ schema: schema }));
router.get('/', graphqlKoa({ schema: schema }));

module.exports = router;