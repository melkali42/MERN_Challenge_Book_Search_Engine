const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
  });

  await server.start();

  const app = express();
  const PORT = process.env.PORT || 3001;

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Serve the client's static files from the build directory
  if (process.env.NODE_ENV === 'production') {
    // Serve index.html and other static assets
    app.use(express.static(path.join(__dirname, '../client/build')));

    // For any other route, serve the index.html file
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
    });
  }

  server.applyMiddleware({ app });

  // Database connection
  await db.once('open', () => {
    console.log('Connected to the database.');
  });

  // Start the server
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });

  app.use(routes);
};

startServer().catch((error) => {
  console.error('Error starting server:', error);
});
