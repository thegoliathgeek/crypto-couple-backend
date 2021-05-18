import { UseGuards } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketGuard } from 'src/auth/guards/socket.guard';
import { ChatsService } from './chat.service';

@WebSocketGateway({ transports: ['websocket'] })
export class SocketGateWay
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private connectedClients: Socket[];
  constructor(private readonly chatService: ChatsService) {
    this.connectedClients = [];
  }
  handleDisconnect(client: Socket) {
    console.log(`Client "${client?.handshake?.headers?.user_id}" Disconnected`);
  }
  handleConnection(client: Socket) {
    this.connectedClients.push(client);
    this.handleClientConnect(client);
  }
  afterInit() {
    console.log('Socket gateway initialized');
  }
  @WebSocketServer()
  server: Server;

  private async sentMessage(data: {
    from: string;
    to: string;
    message: string;
    id: string;
  }) {
    const { from, to, message, id } = data;
    this.connectedClients.forEach(async (client: Socket) => {
      if (client.handshake.headers?.user_id === to) {
        client.emit('chat', { id, from, to, message });
      }
    });
  }

  private async handleClientConnect(client: Socket) {
    const user_id: any = client.handshake.headers?.user_id;
    const chats = await this.chatService.findAllUnSentChats(user_id);
    chats.forEach(async (chat: any) => {
      await this.sentMessage({
        from: chat.from,
        to: chat.to,
        id: chat._id,
        message: chat.data,
      });
    });
  }

  @UseGuards(SocketGuard)
  @SubscribeMessage('sent')
  async sentMessageACK(@MessageBody() data: { id: string }) {
    await this.chatService.updateSent(data.id);
  }

  @UseGuards(SocketGuard)
  @SubscribeMessage('chat')
  async chat(@MessageBody() data: any): Promise<number> {
    const { from, to, message } = data;
    const loggedChat = await this.chatService.addChatLog({
      from_id: from,
      to_id: to,
      data: message,
      sent: false,
    });
    await this.sentMessage({ id: loggedChat._id, ...data });
    return data;
  }
}
