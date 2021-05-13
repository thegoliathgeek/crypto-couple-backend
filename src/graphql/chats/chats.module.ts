import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatCollection, ChatSchema } from 'src/mongo/schemas/chat.schema';
import { ChatsService } from './chat.service';
import { ChatsResolver } from './chats.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: ChatSchema, name: ChatCollection }]),
  ],
  providers: [ChatsResolver, ChatsService],
  exports: [ChatsService],
})
export class ChatsGraphqlModule {}
