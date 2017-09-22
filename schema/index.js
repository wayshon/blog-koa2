// const users = [
//     {id: 11,nickName: 'wayshon1',email: '111@163.com',mobile: '12345678900',avatar: 'String1',manager: 1,creatAt: '2017-01',updateAt: '2017-06'},
//     {id: 22,nickName: 'wayshon2',email: '222@163.com',mobile: '22345678900',avatar: 'String2',manager: 2,creatAt: '2017-02',updateAt: '2017-07'},
//     {id: 33,nickName: 'wayshon3',email: '333@163.com',mobile: '32345678900',avatar: 'String3',manager: 3,creatAt: '2017-03',updateAt: '2017-08'},
//     {id: 44,nickName: 'wayshon4',email: '444@163.com',mobile: '42345678900',avatar: 'String4',manager: 4,creatAt: '2017-04',updateAt: '2017-09'}
// ]

// const articles = [
//     {id: 111,user_id: 11,title: 'title1',content: 'content1',read_count: 1,creat_at: '2017-01',update_at: '2017-06'},
//     {id: 222,user_id: 22,title: 'title2',content: 'content2',read_count: 2,creat_at: '2017-02',update_at: '2017-07'},
//     {id: 333,user_id: 33,title: 'title3',content: 'content3',read_count: 3,creat_at: '2017-03',update_at: '2017-08'},
//     {id: 444,user_id: 44,title: 'title4',content: 'content4',read_count: 4,creat_at: '2017-04',update_at: '2017-09'}
// ]

// const comments = [
//     {id: 1111,user_id: 11,article_id: 30,content: 'comment cotent1',creat_at: '2017-01',update_at: '2017-06'},
//     {id: 2222,user_id: 22,article_id: 30,content: 'comment cotent2',creat_at: '2017-02',update_at: '2017-07'},
//     {id: 3333,user_id: 33,article_id: 30,content: 'comment cotent3',creat_at: '2017-03',update_at: '2017-08'},
//     {id: 4444,user_id: 44,article_id: 30,content: 'comment cotent4',creat_at: '2017-04',update_at: '2017-09'}
// ]

/**
 * 上面是假数据，需换成真接口
 */

const articleDao = require("../dao/ArticleDao"),
      tagDao = require("../dao/TagDao"),
      commentDao = require("../dao/CommentDao"),
      tool = require("../utils/Tools");

const User = require('./User');
const Article = require('./Article');
const Comment = require('./Comment');
const Tag = require('./Tag');

const RootQuery = `
  type Query {
    user(id: Int!): User
    article(id: Int!): Article
    comments(articleId: Int!): [Comment]
    tags(articleId: Int!): [Tag]
  }
  type Mutation {
    modifyContent (
      id: Int!,
      content: String!
    ): Article
  }
`;

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }
`;

const typeDefs = [SchemaDefinition, RootQuery, User, Article, Comment, Tag];

const resolvers = {
  Query: {
    // user: async (_, { id }) => {
    //   return users.find(v => v.id === id)
    // },
    article: async (_, { id }) => {
      // return articles.find(v => v.id === id)
      
      let article =  await articleDao.get(id)
      return article;
    },
    // comments: (_, { article_id }) => {
    //   return articles.find(v => v.article_id === article_id)

    //   // let article =  await articleDao.get(id)
    // }
  },
  Mutation: {
    modifyContent: (_, { id, content }) => {
      console.log(id, content)
      let article = articles.find(v => v.id === id);
      if (!article) throw new Error(`Couldn't find article with id ${id}`);

      article.content = content;
      return article;
    },
  },
  Article: {
    comments: async (article) => {
      // return comments.filter(v => v.article_id === article.id)
      
      let comments = await commentDao.getList(article.id, 0, 1000);
      return comments;
    },
    tags: async (article) => {
      let tags =  await tagDao.getByArticleId(article.id);
      return tags;
    },
  },
  // User: {
  //   articles: (user) => {
  //     return articles.filter(v => v.userId === user.id)
  //   },
  // },
};

const { makeExecutableSchema } = require('graphql-tools');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

module.exports = schema;