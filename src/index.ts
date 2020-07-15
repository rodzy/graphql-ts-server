import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import connectRedis from "connect-redis";
import cors from "cors";
import session from "express-session";
import { FromResolver } from "./modules/user/Register";
import { redis } from "./redis";
import { LoginResolver } from "./modules/user/Login";
import { MeResolver } from "./modules/user/Me";
import { LogoutResolver } from "./modules/user/Logout";
import { sendEmail } from "./utils/sendEmail";


const main = async () => {
  await sendEmail();
  await createConnection();
  const schema = await buildSchema({
    resolvers: [FromResolver, LoginResolver, MeResolver, LogoutResolver],
    authChecker: ({ context: { req } }) => {
      // Authentication
      return !!req.session.userId;
    },
  });
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req,res }: any) => ({ req,res }),
  });
  const app = Express();
  app.use(
    cors({
      credentials: true,
      // Origin the FrontEnd server
      origin: "http://localhost:3000",
    })
  );

  const RedisStore = connectRedis(session);

  app.use(
    session({
      store: new RedisStore({
        client: redis as any,
      }),
      name: "qID",
      secret: "pksapkelsks12232",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365,
      },
    })
  );

  apolloServer.applyMiddleware({ app });
  app.listen(4000, () => {
    console.log("running on http://localhost:4000/graphql");
  });
};

main();
