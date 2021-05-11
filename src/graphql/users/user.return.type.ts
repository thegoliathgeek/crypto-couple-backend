import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserReturnType {
  @Field({ nullable: true })
  id: string;

  @Field()
  name: string;

  @Field(() => Int)
  age: number;

  @Field()
  phoneNo: string;
}
