import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LikesService {
  constructor(private prisma: PrismaService) {}

  async likePost(userId: number, postId: number, isLike: boolean) {
    const existingLike = await this.prisma.like.findUnique({
      where: { userId_postId: { userId, postId } },
    });

    if (existingLike) {
      if (existingLike.isLike === isLike) {
        await this.prisma.like.delete({
          where: { id: existingLike.id },
        });
        return { message: 'Like/dislike removed' };
      } else {
        await this.prisma.like.update({
          where: { id: existingLike.id },
          data: { isLike },
        });
        return { message: `Updated to ${isLike ? 'like' : 'dislike'}` };
      }
    }

    await this.prisma.like.create({
      data: {
        userId,
        postId,
        isLike,
      },
    });
    return { message: `${isLike ? 'Liked' : 'Disliked'} successfully` };
  }

  async getLikesCount(postId: number) {
    const likes = await this.prisma.like.count({
      where: { postId, isLike: true },
    });
    const dislikes = await this.prisma.like.count({
      where: { postId, isLike: false },
    });
    return { likes, dislikes };
  }
}
