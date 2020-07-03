import { Resolver, Query, Mutation, Arg } from "type-graphql";
import * as bcrypt from "bcryptjs";
import { User } from "../../entity/User";

// Getting all the resolvers for users
@Resolver()
export class FromResolver {
  @Query(() => String, { name: "hello" })
  async hello() {
    return "Hello world";
  }

  @Mutation(() => User)
  async register(
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<User> {
    // Hashing the password to 12
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save();
    // Used the promise to get type safety
    return user;
  }
}
