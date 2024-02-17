const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');


async function startServer() {
  const app = express();
  const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/graphql' });

  await mongoose.connect('mongodb+srv://admin:829682@cluster0.mznpgmx.mongodb.net/comp3133_assigment1?retryWrites=true&w=majority', {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
  }).then(() => console.log('Connected to MongoDB'))
      .catch(err => console.error('Could not connect to MongoDB', err));

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}${apolloServer.graphqlPath}`);
  });
}

startServer();

