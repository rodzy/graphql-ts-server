import { Resolver, Query, Mutation, Arg } from "type-graphql";
import * as bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";

// Getting all the resolvers for users
@Resolver()
export class FromResolver {
  @Query(() => String, { name: "hello" })
  async hello() {
    return "Hello world";
  }

  @Mutation(() => User)
  async register(
    @Arg("inputs") { email, firstName, lastName, password }: RegisterInput
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
