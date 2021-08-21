const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    connections: [User]
    description: String
    tags: String
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    me: User
    users(page: Int!): [User]
    user(email: String!): User
    allUsers: [User]
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      description: String
      tags: String
    ): Auth
    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
      description: String
      tags: String
    ): User
    addConnection(connectionId: ID!): User
  }
`;

module.exports = typeDefs;
