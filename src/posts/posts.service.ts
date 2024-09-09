import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Prisma } from '@prisma/client';
import { paginate } from 'src/utils/pagination';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto, userId: number) {
    return this.prisma.post.create({
      data: {
        ...createPostDto,
        userId: userId,
      },
    });
  }

  async update(id: string, updatePostDto: UpdatePostDto, userId: number) {
    const post = await this.prisma.post.findUnique({
      where: { id: Number(id) },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.userId !== userId) {
      throw new UnauthorizedException('You are not allowed to edit this post');
    }

    return this.prisma.post.update({
      where: { id: Number(id) },
      data: updatePostDto,
    });
  }

  async remove(id: string, userId: number) {
    const post = await this.prisma.post.findUnique({
      where: { id: Number(id) },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.userId !== userId) {
      throw new UnauthorizedException(
        'You are not allowed to delete this post',
      );
    }

    return this.prisma.post.delete({ where: { id: Number(id) } });
  }

  async findAll(params: { page?: number; size?: number; search?: string }) {
    const { page = 1, size = 10, search = '' } = params;
    const where: Prisma.PostWhereInput = {
      AND: [
        {
          OR: [
            { text: { contains: search, mode: 'insensitive' } },
            { user: { name: { contains: search, mode: 'insensitive' } } },
            { user: { lastName: { contains: search, mode: 'insensitive' } } },
          ],
        },
      ],
    };

    const [posts, total] = await this.prisma.$transaction([
      this.prisma.post.findMany({
        skip: (page - 1) * size,
        take: size,
        where: where,
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          text: true,
          media: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              id: true,
              name: true,
              lastName: true,
            },
          },
        },
      }),
      this.prisma.post.count({ where }),
    ]);

    const pagination = paginate(total, size, page);

    return {
      pagination,
      data: posts,
    };
  }

  async findOne(id: number) {
    return this.prisma.post.findUnique({
      where: { id },
      select: {
        id: true,
        text: true,
        media: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            name: true,
            lastName: true,
          },
        },
      },
    });
  }

  async findByUser(params: {
    page?: number;
    size?: number;
    search?: string;
    userId: number;
  }) {
    const { page = 1, size = 10, search = '' } = params;

    const where: Prisma.PostWhereInput = {
      AND: [
        { text: { contains: search, mode: 'insensitive' } },
        { userId: Number(params.userId) },
      ],
    };

    const [posts, total] = await this.prisma.$transaction([
      this.prisma.post.findMany({
        skip: (page - 1) * size,
        take: size,
        where: where,
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          text: true,
          media: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              id: true,
              name: true,
              lastName: true,
            },
          },
        },
      }),
      this.prisma.post.count({ where }),
    ]);

    const pagination = paginate(total, size, page);

    return {
      pagination,
      data: posts,
    };
  }
}
