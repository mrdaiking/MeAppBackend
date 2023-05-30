import express from "express";
import cors from "cors";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer, gql } from "apollo-server-express";
import { graphqlHTTP } from "express-graphql";

// In-memory data store

// Schema
const typeDefs = gql`
  type Query {
    greeting: String
  }
`;

// Resolver for warriors
const resolvers = {
  Query: {
    greeting: () => "Hello GraphQL world!👋",
  },
};

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Entrypoint
let apolloServer = null;
async function startServer() {
  apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}
startServer();

const port = 4000;
app.get("/rest", function (req, res) {
  res.json({ data: "api working" });
});

app.listen(port, function () {
  console.log(`Server running on port ${port}`);
  console.log(`GraphQL path is ${apolloServer.graphqlPath}`);
});
