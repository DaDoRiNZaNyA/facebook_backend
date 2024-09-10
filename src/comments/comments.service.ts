import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async createComment(dto: CreateCommentDto, userId: number) {
    return this.prisma.comment.create({
      data: {
        userId: userId,
        postId: dto.postId,
        parentId: dto.parentId,
        text: dto.text,
      },
    });
  }

  async editComment(id: number, text: string, userId: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
      select: { userId: true },
    });
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.userId !== userId) throw new NotFoundException('Not allowed');
    return this.prisma.comment.update({
      where: { id },
      data: { text },
    });
  }

  async deleteComment(id: number, userId: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
      select: { userId: true },
    });
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.userId !== userId) throw new NotFoundException('Not allowed');
    return this.prisma.comment.delete({
      where: { id },
    });
  }

  async getComments(postId: number) {
    const comments = await this.prisma.comment.findMany({
      where: { postId },
      orderBy: { createdAt: 'asc' },
      include: {
        replies: {
          orderBy: { createdAt: 'asc' },
          select: {
            user: true,
            id: true,
            text: true,
            userId: true,
            parentId: true,
            createdAt: true,
          },
        },
        user: true,
      },
    });

    const replyCommentIds = new Set(
      comments.flatMap((comment) => comment.replies.map((reply) => reply.id)),
    );

    const topLevelComments = comments.filter(
      (comment) => !replyCommentIds.has(comment.id),
    );

    return topLevelComments;
  }
}
