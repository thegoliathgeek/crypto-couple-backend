import { Subscription, Resolver, Mutation, Args } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { ChatSubReturnType } from './chat.return.type';

const pubsub = new PubSub();

@Resolver()
export class ChatsResolver {
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
}
