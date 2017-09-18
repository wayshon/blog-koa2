// Article.js

const Comment = require('./Comment')

const Article = `
  type Article {
    id: Int!
    user_id: Int!
    nick_name: String!
    title: String!
    content: String
    reprint_count: Int!
    read_count: Int!
    comment_count: Int!
    praise_count: Int!
    create_at: String
    update_at: String
    tags: [Tag]
    comments: [Comment]
  }
`;
module.exports = Article;