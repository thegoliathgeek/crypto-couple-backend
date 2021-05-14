import { UseGuards } from '@nestjs/common';
import {
  Subscription,
  Resolver,
  Mutation,
  Query,
  Args,
  Context,
} from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { GraphqlJwtGuard } from 'src/auth/guards/graphql-jwt.guard';
import { ChatSessionReturnType, ChatSubReturnType } from './chat.return.type';
import { v4 } from 'uuid';
import { SessionService } from './session.service';

const pubsub = new PubSub();
@UseGuards(GraphqlJwtGuard)
@Resolver()
export class ChatsResolver {
  constructor(private readonly sessionService: SessionService) {}
  @Subscription(() => ChatSubReturnType, {
    resolve: (value) => value,
  })
  async listenChat() {
    return pubsub.asyncIterator('chat');
  }

  @Mutation(() => String)
  async sendChat(@Args('string') data: string) {
    pubsub.publish('chat', { data });
    return 'Sent';
  }

  @Query(() => ChatSessionReturnType)
  async requestChatSession(@Context() ctx) {
    const sessionID = v4();
    ctx.req.session.name = sessionID;
    await this.sessionService.addSession({ ...ctx.req.user }, sessionID);
    return { name: 'ok' };
  }
}
