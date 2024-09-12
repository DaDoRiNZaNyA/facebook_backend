import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async createChatGroup(userIds: number[], name?: string) {
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
    } else {
      if (userIds.length !== 2) {
        throw new Error(
          'Приватный чат может быть только между двумя участниками.',
        );
      }

      const existingChatGroup = await this.prisma.chatGroup.findFirst({
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
  }

  async saveMessage(chatGroupId: number, senderId: number, content: string) {
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
  }

  async getMessages(chatGroupId: number) {
    return this.prisma.message.findMany({
      where: { chatGroupId },
      orderBy: { createdAt: 'asc' },
      include: {
        sender: true,
      },
    });
  }

  async getUserChats(userId: number) {
    const chatGroups = await this.prisma.chatGroup.findMany({
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
      const lastMessageA = a.messages[0]?.createdAt || new Date(0);
      const lastMessageB = b.messages[0]?.createdAt || new Date(0);
      return lastMessageB.getTime() - lastMessageA.getTime();
    });

    return chatGroups;
  }

  async getChatGroup(groupId: number) {
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
  }

  async markAllMessagesAsRead(chatGroupId: number) {
    return this.prisma.message.updateMany({
      where: {
        chatGroupId,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });
  }
}
