import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import { buildSchema, Resolver, Query } from "type-graphql";

@Resolver()
class FromResolver {
  @Query(() => String, { name: "hello" })
  async hello() {
    return "Hello world";
  }
}

const main = async () => {
  const schema = await buildSchema({
    resolvers: [FromResolver],
  });
  const apolloServer = new ApolloServer({ schema });
  const app = Express();
  apolloServer.applyMiddleware({ app });
  app.listen(4000, () => {
    console.log("running on http://localhost:4000");
  });
};

main();
