import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtAuthModule } from 'src/auth/jwt-auth.module';
import { ChatCollection, ChatSchema } from 'src/mongo/schemas/chat.schema';
import { SocketGateWay } from './socket.gateway';

@Module({
  providers: [SocketGateWay],
  imports: [
    JwtAuthModule,
    MongooseModule.forFeature([{ schema: ChatSchema, name: ChatCollection }]),
  ],
})
export class GateWayModule {}
