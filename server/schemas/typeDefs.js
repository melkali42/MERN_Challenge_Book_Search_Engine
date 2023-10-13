const { graphql } = require('appolo-server-express');

const typeDefs = graphql`
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
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        savedBooks: [Book]
        bookCount: Int
    }
    type InputBook {
        authors: [String]
        description: String
        bookId: String!
        image: String
        link: String
        title: String!
    }
    type Query {
        me: User
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(newBook: Book!): User
        removeBook(bookId: ID!): User
    }
`;

module.exports = typeDefs;