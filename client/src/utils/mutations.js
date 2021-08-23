import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $description: String
    $tags: String
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      description: $description
      tags: $tags
    ) {
      token
      user {
        _id
        firstName
        lastName
        email
        description
        tags
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $firstName: String
    $lastName: String
    $email: String
    $password: String
    $description: String
    $tags: String
  ) {
    updateUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      description: $description
      tags: $tags
    ) {
      _id
      firstName
      lastName
      email
      description
      tags
    }
  }
`;

export const ADD_CONNECTION = gql`
  mutation addConnection($id: ID!) {
    addConnection(connectionId: $id) {
      _id
      firstName
      lastName
      email
      description
      tags
      connections {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const REMOVE_CONNECTION = gql`
  mutation removeConnection($id: ID!) {
    removeConnection(connectionId: $id) {
      _id
      firstName
      lastName
      email
      description
      tags
      connections {
        _id
        firstName
        lastName
      }
    }
  }
`;
