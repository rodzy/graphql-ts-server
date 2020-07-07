import { Resolver, Mutation, Ctx } from "type-graphql";
import { MyContext } from "../types/MyContext";

// Logout Mutation for logout
@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: MyContext): Promise<Boolean> {
    return new Promise((res, rej) =>
      ctx.req.session!.destroy((err) => {
        if (err) {
          console.log(err);
          rej(false);
        }
        // Clearing the cookie with res from MyContext
        ctx.res.clearCookie("qID");
        res(true);
      })
    );
  }
}
