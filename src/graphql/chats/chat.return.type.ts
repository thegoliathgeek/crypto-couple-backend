import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChatSubReturnType {
  @Field()
  data: string;
}
