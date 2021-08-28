const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`

  # An enum is similar to a scalar type, but its legal values are defined in the schema.
  # Enums are most useful in situations where the user must pick from a prescribed list of options.
  enum Format {
    KINDLE
    AUDIOBOOK
    PAPERBACK
    HARDCOVER
  }

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    id: Int!
    title: String!
    author: String!
    format: Format!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book!]!
    bookById(bookID: Int!): [Book!]!
    bookByName(bookName: String!): Book!
    bookByFormat(bookFormat: Format!) :[Book!]!
  }
`;

// Mock DataSource
const books = [
    {
        id: 1,
        title: 'The Awakening',
        author: 'Kate Chopin',
        format: "AUDIOBOOK"
    },
    {
        id: 2,
        title: 'City of Glass',
        author: 'Paul Auster',
        format: "HARDCOVER"
    },
    {
        id: 3,
        title: 'The Eagle Has Landed',
        author: 'Jack Higgins',
        format: "PAPERBACK"
    }
];


// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Format: {
        KINDLE: "KINDLE",
        AUDIOBOOK: "AUDIOBOOK",
        PAPERBACK: "PAPERBACK",
        HARDCOVER: "HARDCOVER"
    },
    Query: {
        books: () => books,
        bookById: (parent, { bookID }) => books.filter(book => book.id === bookID),
        bookByName: (parent, { bookName }) => books.find(book => book.title === bookName),
        bookByFormat: (parent, { bookFormat }) => books.filter(book => book.format === bookFormat)
    },
};


// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// Run server, listen on port 4000
(async() => {
    const res = await server.listen();
    console.log(`🚀  Server ready at ${res.url}`);
})()



