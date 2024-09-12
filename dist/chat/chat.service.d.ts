import { PrismaService } from 'src/prisma.service';
export declare class ChatService {
    private prisma;
    constructor(prisma: PrismaService);
    createChatGroup(userIds: number[], name?: string): Promise<{
        participants: {
            id: number;
            userId: number;
            chatGroupId: number;
            isAdmin: boolean;
            lastReadAt: Date | null;
        }[];
    } & {
        id: number;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    saveMessage(chatGroupId: number, senderId: number, content: string): Promise<{
        id: number;
        createdAt: Date;
        content: string;
        chatGroupId: number;
        senderId: number;
        isRead: boolean;
        sender: {
            id: number;
            email: string;
            password: string;
            name: string | null;
            lastName: string | null;
            avatar: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    getMessages(chatGroupId: number): Promise<({
        sender: {
            id: number;
            email: string;
            password: string;
            name: string | null;
            lastName: string | null;
            avatar: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: number;
        chatGroupId: number;
        senderId: number;
        content: string;
        isRead: boolean;
        createdAt: Date;
    })[]>;
    getUserChats(userId: number): Promise<({
        messages: {
            createdAt: Date;
            content: string;
            isRead: boolean;
            sender: {
                name: string;
                id: number;
                lastName: string;
            };
        }[];
        participants: {
            user: {
                name: string;
                id: number;
                lastName: string;
                avatar: string;
            };
        }[];
    } & {
        id: number;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getChatGroup(groupId: number): Promise<{
        participants: {
            userId: number;
        }[];
    } & {
        id: number;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    markAllMessagesAsRead(chatGroupId: number): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
