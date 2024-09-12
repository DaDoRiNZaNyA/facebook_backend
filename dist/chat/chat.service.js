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
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ChatService = class ChatService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    createChatGroup(userIds, name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (name) {
                return this.prisma.chatGroup.create({
                    data: {
                        participants: {
                            create: userIds.map((userId) => ({ userId })),
                        },
                        name,
                    },
                    include: {
                        participants: true,
                    },
                });
            }
            else {
                if (userIds.length !== 2) {
                    throw new Error('Приватный чат может быть только между двумя участниками.');
                }
                const existingChatGroup = yield this.prisma.chatGroup.findFirst({
                    where: {
                        name: null,
                        participants: {
                            every: {
                                userId: { in: userIds },
                            },
                        },
                    },
                    include: {
                        participants: true,
                    },
                });
                if (existingChatGroup) {
                    return existingChatGroup;
                }
                return this.prisma.chatGroup.create({
                    data: {
                        participants: {
                            create: userIds.map((userId) => ({ userId })),
                        },
                    },
                    include: {
                        participants: true,
                    },
                });
            }
        });
    }
    saveMessage(chatGroupId, senderId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.message.create({
                data: {
                    chatGroupId,
                    senderId,
                    content,
                    isRead: false,
                },
                select: {
                    sender: true,
                    createdAt: true,
                    content: true,
                    id: true,
                    senderId: true,
                    isRead: true,
                    chatGroupId: true,
                },
            });
        });
    }
    getMessages(chatGroupId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.message.findMany({
                where: { chatGroupId },
                orderBy: { createdAt: 'asc' },
                include: {
                    sender: true,
                },
            });
        });
    }
    getUserChats(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const chatGroups = yield this.prisma.chatGroup.findMany({
                where: {
                    participants: {
                        some: { userId: userId },
                    },
                },
                include: {
                    participants: {
                        select: {
                            user: {
                                select: {
                                    id: true,
                                    name: true,
                                    lastName: true,
                                    avatar: true,
                                },
                            },
                        },
                    },
                    messages: {
                        select: {
                            createdAt: true,
                            content: true,
                            isRead: true,
                            sender: {
                                select: {
                                    id: true,
                                    name: true,
                                    lastName: true,
                                },
                            },
                        },
                        orderBy: {
                            createdAt: 'desc',
                        },
                        take: 1,
                    },
                },
            });
            chatGroups.sort((a, b) => {
                var _a, _b;
                const lastMessageA = ((_a = a.messages[0]) === null || _a === void 0 ? void 0 : _a.createdAt) || new Date(0);
                const lastMessageB = ((_b = b.messages[0]) === null || _b === void 0 ? void 0 : _b.createdAt) || new Date(0);
                return lastMessageB.getTime() - lastMessageA.getTime();
            });
            return chatGroups;
        });
    }
    getChatGroup(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.chatGroup.findUnique({
                where: { id: groupId },
                include: {
                    participants: {
                        select: {
                            userId: true,
                        },
                    },
                },
            });
        });
    }
    markAllMessagesAsRead(chatGroupId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.message.updateMany({
                where: {
                    chatGroupId,
                    isRead: false,
                },
                data: {
                    isRead: true,
                },
            });
        });
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChatService);
//# sourceMappingURL=chat.service.js.map