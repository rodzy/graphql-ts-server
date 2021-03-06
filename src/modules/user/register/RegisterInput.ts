import { Length, IsEmail } from "class-validator";
import { InputType, Field } from "type-graphql";
import { IsEmailAlreadyExist } from "./isEmailAlreadyExists";

@InputType()
export class RegisterInput {
  @Field()
  @Length(1, 255)
  firstName: string;
  @Field()
  @Length(1, 255)
  lastName: string;
  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({message:"Email already exists, it must be unique"})
  email: string;
  @Field()
  password: string;
}
