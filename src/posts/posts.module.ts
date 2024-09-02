import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';

@Module({
  imports: [],
  providers: [PostsService, PrismaService],
  controllers: [PostsController],
})
export class PostsModule {}
