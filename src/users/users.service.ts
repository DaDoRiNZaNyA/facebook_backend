import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { paginate } from 'src/utils/pagination';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto) {
    return this.prisma.user.create({
      data,
    });
  }

  async findAll(params: {
    page?: number;
    size?: number;
    search?: string;
    userId: number;
  }) {
    const { page = 1, size = 10, search = '' } = params;
    const where: Prisma.UserWhereInput = {
      AND: [
        {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { lastName: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
          ],
        },
        { id: { not: params.userId } },
      ],
    };

    const [users, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        skip: (page - 1) * size,
        take: size,
        where: where,
        select: {
          id: true,
          email: true,
          name: true,
          lastName: true,
          followers: {
            select: {
              followerId: true,
            },
          },
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    const usersWithFollowStatus = users.map(({ followers, ...user }) => ({
      ...user,
      isFollowed: followers.some(
        (follower) => follower.followerId === params.userId,
      ),
    }));

    const pagination = paginate(total, size, page);

    return {
      pagination,
      data: usersWithFollowStatus,
    };
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async deleteUser(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async updateUser({
    id,
    name,
    lastName,
    email,
  }: {
    id: number;
    name: string;
    lastName?: string;
    email: string;
  }) {
    return this.prisma.user.update({
      where: { id },
      data: { name, lastName, email },
    });
  }
}
