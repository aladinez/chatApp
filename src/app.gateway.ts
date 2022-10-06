import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server : Server;
  c_message = {
    name: '',
    text: ''
   }
  
  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: any, roomName : string): void {
    this.c_message.name = `${client.id}`
    this.c_message.text = payload.text
    // this.server.emit('msgToClient', this.c_message);
    this.server.to(roomName).emit('msgToClient', this.c_message);
  }
  
  afterInit(server: any) {
    console.log("INIIIIIT!!");
  }
  handleDisconnect(client: Socket, ...args: any[]) {
    console.log(`Client disconnected: ${client.id}`);
    this.c_message.name = `${client.id}`
    this.c_message.text = "has left chat"
    client.broadcast.emit('msgToClient', this.c_message);
  }
  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
    this.c_message.name = `${client.id}`
    this.c_message.text = "has joined chat"
    client.broadcast.emit('msgToClient', this.c_message);
    
    

  }
  @SubscribeMessage('JoinRoom')
  onChgEvent(client: Socket, roomName: string): void {
    this.c_message.name = `${client.id}`
    this.c_message.text = "joined room ";
    client.join(roomName);
    client.to(roomName).emit('msgToClient', this.c_message);
  }
}
