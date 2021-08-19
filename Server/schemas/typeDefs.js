const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    connections: [User]
    description: String
    tags: [Tag]
  }
  type Tag {
    _id: ID
    name: String
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    me: User
    users(first:5 offset:5): [User]
    user(username: String!): User
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      description: String
      tags: [Tag]
    ): Auth
    updateUser(
      firstName: String
      lastName: String
      email: String
      connections: [User]
      password: String
      description: String
      tags: [Tag]
    ): User
  }
`;

module.exports = typeDefs;
