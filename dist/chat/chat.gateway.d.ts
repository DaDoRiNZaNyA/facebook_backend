import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ChatService } from './chat.service';
import { AuthService } from '../auth/auth.service';
export declare class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private chatService;
    private authService;
    private jwtService;
    server: Server;
    constructor(chatService: ChatService, authService: AuthService, jwtService: JwtService);
    afterInit(): void;
    handleConnection(): void;
    handleDisconnect(): void;
    handleAuthenticate(data: {
        token: string;
    }, socket: Socket): Promise<void>;
    handleSendMessage(data: {
        groupId: number;
        message: string;
        token: string;
    }): Promise<void>;
    handleGetMessages(data: {
        groupId: number;
        token: string;
    }): Promise<void>;
    handleGetUserChats(data: {
        token: string;
    }): Promise<void>;
    handleMarkAllMessagesAsRead(data: {
        groupId: number;
        token: string;
    }): Promise<void>;
}
