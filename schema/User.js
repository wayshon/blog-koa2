// User.js

const Article = require('./Article')

const User = `
  type User {
    id: Int!
    nick_name: String!
    email: String
    mobile: String
    avatar: String
    manager: Int!
    create_at: String
    update_at: String
    articles: [Article]
  }
`;
module.exports = User;