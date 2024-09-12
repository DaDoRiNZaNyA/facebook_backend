import {
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ChatService } from './chat.service';
import { AuthService } from '../auth/auth.service';

@WebSocketGateway({ cors: true })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  afterInit() {
    console.log('WebSocket server initialized');
  }

  handleConnection() {
    console.log('New client connected');
  }

  handleDisconnect() {
    console.log('Client disconnected');
  }

  @SubscribeMessage('authenticate')
  async handleAuthenticate(
    @MessageBody() data: { token: string },
    @ConnectedSocket() socket: Socket,
  ) {
    try {
      const user = await this.authService.getProfile(data.token);
      socket.join(user.id.toString());
      console.log(`User ${user.id} authenticated and connected`);
      socket.emit('authenticated', { userId: user.id });
    } catch (error) {
      console.error('Authentication error:', error);
      socket.emit('authenticationError', 'Invalid token');
      socket.disconnect();
    }
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody() data: { groupId: number; message: string; token: string },
  ) {
    try {
      const sender = await this.authService.getProfile(data.token);
      const chatGroup = await this.chatService.getChatGroup(data.groupId);
      const message = await this.chatService.saveMessage(
        data.groupId,
        sender.id,
        data.message,
      );

      chatGroup.participants.forEach((participant) => {
        this.server
          .to(participant.userId.toString())
          .emit('receiveMessage', message);
      });
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
    }
  }

  @SubscribeMessage('getMessages')
  async handleGetMessages(
    @MessageBody() data: { groupId: number; token: string },
  ) {
    try {
      const messages = await this.chatService.getMessages(data.groupId);
      const user = await this.authService.getProfile(data.token);

      this.server.to(user.id.toString()).emit('messages', messages);
    } catch (error) {
      console.error('Error in handleGetMessages:', error);
    }
  }

  @SubscribeMessage('getUserChats')
  async handleGetUserChats(@MessageBody() data: { token: string }) {
    try {
      const user = await this.authService.getProfile(data.token);
      const chats = await this.chatService.getUserChats(user.id);

      this.server.to(user.id.toString()).emit('userChats', chats);
    } catch (error) {
      console.error('Error in handleGetUserChats:', error);
    }
  }

  @SubscribeMessage('markAllMessagesAsRead')
  async handleMarkAllMessagesAsRead(
    @MessageBody() data: { groupId: number; token: string },
  ) {
    try {
      const user = await this.authService.getProfile(data.token);

      await this.chatService.markAllMessagesAsRead(data.groupId);
      const chats = await this.chatService.getUserChats(user.id);

      this.server.to(user.id.toString()).emit('userChats', chats);
    } catch (error) {
      console.error('Error in handleMarkAllMessagesAsRead:', error);
    }
  }
}
