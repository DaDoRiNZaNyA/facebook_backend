import { Injectable, NotFoundException } from '@nestjs/common';
import { Follow } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FollowService {
  constructor(private prisma: PrismaService) {}

  async followUser(followerId: number, followingId: number): Promise<Follow> {
    if (followerId === followingId) {
      throw new Error('Невозможно подписаться на самого себя');
    }

    const existingFollow = await this.prisma.follow.findFirst({
      where: { followerId, followingId },
    });

    if (existingFollow) {
      throw new Error('Вы уже подписаны на этого пользователя');
    }

    return this.prisma.follow.create({
      data: {
        followerId,
        followingId,
      },
    });
  }

  async unfollowUser(followerId: number, followingId: number): Promise<Follow> {
    const follow = await this.prisma.follow.findFirst({
      where: { followerId, followingId },
    });

    if (!follow) {
      throw new NotFoundException('Подписка не найдена');
    }

    return await this.prisma.follow.delete({
      where: { id: follow.id },
    });
  }

  async getFollowing(userId: number): Promise<Follow[]> {
    return this.prisma.follow.findMany({
      where: { followerId: userId },
      include: {
        following: true,
      },
    });
  }

  async getFollowers(userId: number): Promise<Follow[]> {
    return this.prisma.follow.findMany({
      where: { followingId: userId },
      include: {
        follower: true,
      },
    });
  }
}
