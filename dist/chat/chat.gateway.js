"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const jwt_1 = require("@nestjs/jwt");
const chat_service_1 = require("./chat.service");
const auth_service_1 = require("../auth/auth.service");
let ChatGateway = class ChatGateway {
    constructor(chatService, authService, jwtService) {
        this.chatService = chatService;
        this.authService = authService;
        this.jwtService = jwtService;
    }
    afterInit() {
        console.log('WebSocket server initialized');
    }
    handleConnection() {
        console.log('New client connected');
    }
    handleDisconnect() {
        console.log('Client disconnected');
    }
    handleAuthenticate(data, socket) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.authService.getProfile(data.token);
                socket.join(user.id.toString());
                console.log(`User ${user.id} authenticated and connected`);
                socket.emit('authenticated', { userId: user.id });
            }
            catch (error) {
                console.error('Authentication error:', error);
                socket.emit('authenticationError', 'Invalid token');
                socket.disconnect();
            }
        });
    }
    handleSendMessage(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sender = yield this.authService.getProfile(data.token);
                const chatGroup = yield this.chatService.getChatGroup(data.groupId);
                const message = yield this.chatService.saveMessage(data.groupId, sender.id, data.message);
                chatGroup.participants.forEach((participant) => {
                    this.server
                        .to(participant.userId.toString())
                        .emit('receiveMessage', message);
                });
            }
            catch (error) {
                console.error('Error in handleSendMessage:', error);
            }
        });
    }
    handleGetMessages(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messages = yield this.chatService.getMessages(data.groupId);
                const user = yield this.authService.getProfile(data.token);
                this.server.to(user.id.toString()).emit('messages', messages);
            }
            catch (error) {
                console.error('Error in handleGetMessages:', error);
            }
        });
    }
    handleGetUserChats(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.authService.getProfile(data.token);
                const chats = yield this.chatService.getUserChats(user.id);
                this.server.to(user.id.toString()).emit('userChats', chats);
            }
            catch (error) {
                console.error('Error in handleGetUserChats:', error);
            }
        });
    }
    handleMarkAllMessagesAsRead(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.authService.getProfile(data.token);
                yield this.chatService.markAllMessagesAsRead(data.groupId);
                const chats = yield this.chatService.getUserChats(user.id);
                this.server.to(user.id.toString()).emit('userChats', chats);
            }
            catch (error) {
                console.error('Error in handleMarkAllMessagesAsRead:', error);
            }
        });
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('authenticate'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleAuthenticate", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleSendMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getMessages'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleGetMessages", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getUserChats'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleGetUserChats", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('markAllMessagesAsRead'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleMarkAllMessagesAsRead", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    __metadata("design:paramtypes", [chat_service_1.ChatService,
        auth_service_1.AuthService,
        jwt_1.JwtService])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map