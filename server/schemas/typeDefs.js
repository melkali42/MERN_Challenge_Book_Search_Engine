const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Auth {
        token: ID!
        user: User
    }
    
    type Book {
        bookId: ID!
        authors: [String]
        description: String
        image: String
        link: String
        title: String!
    }
    
    input BookInput {
        authors: [String]
        description: String
        bookId: String!
        image: String
        link: String
        title: String!
    }
    
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        savedBooks: [Book]
        bookCount: Int
    }
    
    type Query {
        me: User
    }
    
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(newBook: BookInput!): User
        removeBook(bookId: ID!): User
    }
`;

module.exports = typeDefs;
