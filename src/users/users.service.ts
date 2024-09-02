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

  async findAll(params: { page?: number; size?: number; search?: string }) {
    const { page = 1, size = 10, search = '' } = params;
    const where: Prisma.UserWhereInput = {
      AND: [
        {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
          ],
        },
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
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    const pagination = paginate(total, size, page);

    // Возвращаем результат
    return {
      pagination,
      data: users,
    };
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      // select: {
      //   id: true,
      //   email: true,
      //   name: true,
      //   lastName: true,
      //   createdAt: true,
      //   updatedAt: true,
      // },
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
}
