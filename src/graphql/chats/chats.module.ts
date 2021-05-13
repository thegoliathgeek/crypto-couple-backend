import { Module } from '@nestjs/common';
import { ChatsResolver } from './chats.resolver';

@Module({
  providers: [ChatsResolver],
})
export class ChatsGraphqlModule {}
