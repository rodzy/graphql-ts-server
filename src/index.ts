import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { FromResolver } from './modules/user/Register';


const main = async () => {
  await createConnection();
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
