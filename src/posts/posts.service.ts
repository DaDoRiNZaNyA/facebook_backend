import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

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
}
