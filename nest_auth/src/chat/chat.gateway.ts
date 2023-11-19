import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(81, { transports: ['websocket'] })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message_send')
  handleMessage(@MessageBody() data: string) {
    this.server.emit('message_received', data);
    console.log(data);
  }
}
