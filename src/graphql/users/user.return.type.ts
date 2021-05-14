import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserReturnType {
  @Field({ nullable: true })
  _id: string;

  @Field()
  name: string;

  @Field(() => Int)
  age: number;

  @Field()
  phoneNo: string;
}

@ObjectType()
export class TokenReturnType {
  @Field()
  access_token: string;
}
