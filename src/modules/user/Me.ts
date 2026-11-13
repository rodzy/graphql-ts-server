import { Resolver, Ctx, Query } from "type-graphql";

import { User } from "../../entity/User";
import { MyContext } from "../types/MyContext";

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: MyContext): Promise<User | null> {
    const id = ctx.req.session!.userid;
    if (!id) {
      return null;
    }
    // TypeORM 0.3 findOne() takes FindOneOptions, not a primary key.
    return User.findOne({ where: { id } });
  }
}
