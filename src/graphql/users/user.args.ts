import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserArgs {
  @Field()
  name: string;

  @Field()
  phoneNo: string;

  @Field(() => Int)
  age: number;

  @Field()
  username: string;

  @Field()
  password: string;
}

@InputType()
export class LoginArgs {
  @Field()
  username: string;

  @Field()
  password: string;
}
