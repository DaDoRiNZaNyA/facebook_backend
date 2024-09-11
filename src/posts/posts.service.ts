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
import { extname, join } from 'path';
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from 'fs';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createPostDto: CreatePostDto,
    media: Array<Express.Multer.File>,
    userId: number,
  ) {
    const { text } = createPostDto;

    const uploadDir = join(__dirname, '../../uploads/posts');
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }

    const mediaRecords = media.map((file) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      const filename = `post-${uniqueSuffix}${ext}`;
      const filePath = join(uploadDir, filename);

      writeFileSync(filePath, file.buffer);

      const relativeUrl = `/uploads/posts/${filename}`;

      return {
        url: relativeUrl,
        type: file.mimetype,
      };
    });

    return this.prisma.$transaction(async (prisma) => {
      const post = await prisma.post.create({
        data: {
          text,
          userId,
        },
      });

      const mediaPromises = mediaRecords.map((record) =>
        prisma.media.create({
          data: {
            postId: post.id,
            url: record.url,
            type: record.type,
          },
        }),
      );

      await Promise.all(mediaPromises);

      return post;
    });
  }

  async addMediaToPost(
    postId: number,
    files: Array<Express.Multer.File>,
    userId: number,
  ) {
    const post = await this.prisma.post.findUnique({
      where: { id: Number(postId) },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.userId !== userId) {
      throw new UnauthorizedException('You are not allowed to edit this post');
    }

    const uploadDir = join(__dirname, '../../uploads/posts');

    const mediaRecords = files.map((file) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      const filename = `post-${uniqueSuffix}${ext}`;
      const filePath = join(uploadDir, filename);

      writeFileSync(filePath, file.buffer);

      const relativeUrl = `/uploads/posts/${filename}`;

      return {
        url: relativeUrl,
        type: file.mimetype,
      };
    });

    const mediaPromises = mediaRecords.map((record) =>
      this.prisma.media.create({
        data: {
          postId,
          url: record.url,
          type: record.type,
        },
      }),
    );

    await Promise.all(mediaPromises);
  }

  async removeMediaFromPost(
    postId: number,
    mediaIds: number[],
    userId: number,
  ) {
    const post = await this.prisma.post.findUnique({
      where: { id: Number(postId) },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.userId !== userId) {
      throw new UnauthorizedException('You are not allowed to edit this post');
    }

    const mediaRecords = await this.prisma.media.findMany({
      where: {
        id: { in: mediaIds },
      },
    });

    mediaRecords.forEach((record) => {
      const filePath = join(
        __dirname,
        '../../uploads/posts',
        record.url.replace('/uploads/posts/', ''),
      );
      unlinkSync(filePath);
    });

    await this.prisma.media.deleteMany({
      where: {
        id: { in: mediaIds },
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
      include: { media: true },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.userId !== userId) {
      throw new UnauthorizedException(
        'You are not allowed to delete this post',
      );
    }

    const uploadDir = join(__dirname, '../../uploads/posts');
    post.media.forEach((media) => {
      const filePath = join(
        uploadDir,
        media.url.replace('/uploads/posts/', ''),
      );
      try {
        unlinkSync(filePath);
      } catch (err) {
        console.error(`Failed to delete file at ${filePath}:`, err);
      }
    });

    await this.prisma.media.deleteMany({
      where: { postId: Number(id) },
    });

    return this.prisma.post.delete({ where: { id: Number(id) } });
  }

  async findAll(params: {
    page?: number;
    size?: number;
    search?: string;
    userId?: number;
    authUserId?: number;
  }) {
    const { page = 1, size = 10, search = '', userId, authUserId } = params;
    const where: Prisma.PostWhereInput = {
      AND: [
        {
          OR: [
            { text: { contains: search, mode: 'insensitive' } },
            { user: { name: { contains: search, mode: 'insensitive' } } },
            { user: { lastName: { contains: search, mode: 'insensitive' } } },
          ],
        },
        userId ? { userId: Number(params.userId) } : {},
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
              avatar: true,
            },
          },
          Like: {
            select: {
              userId: true,
              isLike: true,
            },
          },
          Comment: {
            select: {
              id: true,
            },
          },
        },
      }),
      this.prisma.post.count({ where }),
    ]);

    const postsWithLikes = posts.map(({ Like, Comment, ...post }) => {
      const totalLikes = Like.filter((like) => like.isLike).length;
      const totalDislikes = Like.filter((like) => !like.isLike).length;
      const totalComments = Comment.length;

      const userReaction = authUserId
        ? Like.find((like) => like.userId === authUserId)
        : null;

      return {
        ...post,
        totalLikes,
        totalDislikes,
        totalComments,
        userReaction: userReaction
          ? userReaction.isLike
            ? 'like'
            : 'dislike'
          : null,
      };
    });

    const pagination = paginate(total, size, page);

    return {
      pagination,
      data: postsWithLikes,
    };
  }

  async findOne(id: number, userId?: number) {
    const { Like, Comment, ...post } = await this.prisma.post.findUnique({
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
            avatar: true,
          },
        },
        Like: {
          select: {
            userId: true,
            isLike: true,
          },
        },
        Comment: {
          select: {
            id: true,
          },
        },
      },
    });

    const totalLikes = Like.filter((like) => like.isLike).length;
    const totalDislikes = Like.filter((like) => !like.isLike).length;
    const totalComments = Comment.length;

    const userReaction = userId
      ? Like.find((like) => like.userId === userId)
      : null;

    return {
      ...post,
      totalLikes,
      totalDislikes,
      totalComments,
      userReaction: userReaction
        ? userReaction.isLike
          ? 'like'
          : 'dislike'
        : null,
    };
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
              avatar: true,
            },
          },
          Like: {
            select: {
              userId: true,
              isLike: true,
            },
          },
          Comment: {
            select: {
              id: true,
            },
          },
        },
      }),
      this.prisma.post.count({ where }),
    ]);

    const postsWithLikes = posts.map(({ Like, Comment, ...post }) => {
      const totalLikes = Like.filter((like) => like.isLike).length;
      const totalDislikes = Like.filter((like) => !like.isLike).length;
      const totalComments = Comment.length;

      const userReaction = params.userId
        ? Like.find((like) => like.userId === params.userId)
        : null;

      return {
        ...post,
        totalLikes,
        totalDislikes,
        totalComments,
        userReaction: userReaction
          ? userReaction.isLike
            ? 'like'
            : 'dislike'
          : null,
      };
    });

    const pagination = paginate(total, size, page);

    return {
      pagination,
      data: postsWithLikes,
    };
  }
}
