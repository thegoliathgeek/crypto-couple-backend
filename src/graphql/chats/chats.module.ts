import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatCollection, ChatSchema } from 'src/mongo/schemas/chat.schema';
import {
  SessionCollections,
  SessionSchema,
} from 'src/mongo/schemas/session.schema';
import { ChatsService } from './chat.service';
import { ChatsResolver } from './chats.resolver';
import { SessionService } from './session.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: ChatSchema, name: ChatCollection },
      {
        schema: SessionSchema,
        name: SessionCollections,
      },
    ]),
  ],
  providers: [ChatsResolver, ChatsService, SessionService],
  exports: [ChatsService, SessionService],
})
export class ChatsGraphqlModule {}
