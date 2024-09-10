import { Injectable, NotFoundException } from '@nestjs/common';
import { Follow, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { paginate } from 'src/utils/pagination';

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

  async getFollowers(userId: number, page: number, size: number) {
    const where: Prisma.FollowWhereInput = {
      followingId: userId,
    };

    const [follows, total] = await this.prisma.$transaction([
      this.prisma.follow.findMany({
        skip: (page - 1) * size,
        take: size,
        where: where,
        include: {
          follower: {
            select: {
              id: true,
              name: true,
              lastName: true,
              followers: {
                select: {
                  followerId: true,
                },
                where: {
                  followerId: userId,
                },
              },
            },
          },
        },
      }),
      this.prisma.follow.count({ where }),
    ]);

    const followsWithFollowStatus = follows.map((data) => ({
      id: data.id,
      followerId: data.followerId,
      followingId: data.followingId,
      isFollowed: data.follower.followers.length > 0,
      follower: {
        name: data.follower.name,
        lastName: data.follower.lastName,
        id: data.follower.id,
      },
    }));

    const pagination = paginate(total, size, page);
    return { pagination, data: followsWithFollowStatus };
  }

  async isUserFollowed(
    followerId: number,
    followingId: number,
  ): Promise<{ isFollowed: boolean }> {
    const followRecord = await this.prisma.follow.findFirst({
      where: {
        followerId: followerId,
        followingId: followingId,
      },
    });

    return {
      isFollowed: !!followRecord,
    };
  }
}
