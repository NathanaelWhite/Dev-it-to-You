import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  {
    me {
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
        email
        description
        tags
      }
    }
  }
`;

export const QUERY_USERS = gql`
  query users($page: Int!) {
    users(page: $page) {
      _id
      firstName
      lastName
      description
      tags
    }
  }
`;

export const QUERY_USER = gql`
  query user($_id: ID!) {
    user(_id: $_id) {
      _id
      firstName
      lastName
      email
      description
      tags
    }
  }
`;
