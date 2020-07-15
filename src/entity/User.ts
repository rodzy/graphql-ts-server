import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;
  @Field()
  @Column()
  firstName: string;
  @Field()
  @Column()
  lastName: string;
  @Field()
  @Column("text", { unique: true })
  email: string;
  @Field()
  @Column()
  password: string;

  @Column("bool", { default: false })
  confirmed: boolean;
}

// Base entity used for operations with the user entity
