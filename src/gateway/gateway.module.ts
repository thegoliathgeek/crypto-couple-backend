import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtAuthModule } from 'src/auth/jwt-auth.module';
import { ChatCollection, ChatSchema } from 'src/mongo/schemas/chat.schema';
import { ChatsService } from './chat.service';
import { SocketGateWay } from './socket.gateway';

@Module({
  providers: [SocketGateWay, ChatsService],
  imports: [
    JwtAuthModule,
    MongooseModule.forFeature([{ schema: ChatSchema, name: ChatCollection }]),
  ],
})
export class GateWayModule {}
