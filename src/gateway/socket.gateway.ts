import { UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GraphqlJwtGuard } from 'src/auth/guards/graphql-jwt.guard';
import { SocketGuard } from 'src/auth/guards/socket.guard';

@WebSocketGateway({ transports: ['websocket'] })
export class SocketGateWay
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  handleDisconnect(client: any) {
    console.log(client.connected);
  }
  handleConnection(client: Socket, ...args: any[]) {
    // console.log(client.handshake.headers);
  }
  afterInit(server: any) {
    // console.log(server);
  }
  @WebSocketServer()
  server: Server;

  @UseGuards(SocketGuard)
  @SubscribeMessage('chat')
  async chat(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): Promise<number> {
    console.log(data);
    return data;
  }
}
