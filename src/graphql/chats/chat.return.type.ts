import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChatSubReturnType {
  @Field()
  data: string;
}

@ObjectType()
export class ChatSessionReturnType {
  @Field()
  name: string;
}
