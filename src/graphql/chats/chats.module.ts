import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SessionCollections,
  SessionSchema,
} from 'src/mongo/schemas/session.schema';
import { ChatsResolver } from './chats.resolver';
import { SessionService } from './session.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        schema: SessionSchema,
        name: SessionCollections,
      },
    ]),
  ],
  providers: [ChatsResolver, SessionService],
  exports: [SessionService],
})
export class ChatsGraphqlModule {}
