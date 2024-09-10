import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { EditCommentDto } from './dto/edit-comment.dto';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    schema: {
      example: {
        id: 1,
        userId: 1,
        postId: 1,
        parentId: null,
        text: 'Это комментарий',
        createdAt: '2024-09-10T13:06:44.300Z',
        updatedAt: '2024-09-10T13:06:44.300Z',
      },
    },
  })
  async createComment(@Body() createCommentDto: CreateCommentDto, @Req() req) {
    const userId = req.user.id;
    return this.commentsService.createComment(createCommentDto, userId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    schema: {
      example: {
        id: 1,
        userId: 1,
        postId: 1,
        parentId: null,
        text: 'Это комментарий',
        createdAt: '2024-09-10T13:06:44.300Z',
        updatedAt: '2024-09-10T13:06:44.300Z',
      },
    },
  })
  async editComment(
    @Param('id') id: number,
    @Body() editCommentDto: EditCommentDto,
    @Req() req,
  ) {
    const userId = req.user.id;
    return this.commentsService.editComment(id, editCommentDto.text, userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    schema: {
      example: {
        id: 1,
        userId: 1,
        postId: 1,
        parentId: null,
        text: 'Это комментарий',
        createdAt: '2024-09-10T13:06:44.300Z',
        updatedAt: '2024-09-10T13:06:44.300Z',
      },
    },
  })
  async deleteComment(@Param('id') id: number, @Req() req) {
    const userId = req.user.id;
    return this.commentsService.deleteComment(id, userId);
  }

  @Get(':postId')
  @ApiResponse({
    status: 201,
    schema: {
      example: [
        {
          id: 1,
          userId: 1,
          postId: 1,
          parentId: null,
          text: 'Это комментарий',
          createdAt: '2024-09-10T13:06:44.300Z',
          updatedAt: '2024-09-10T13:06:44.300Z',
          replies: [
            {
              user: {
                id: 1,
                email: 'user@example.com',
                password:
                  '$2b$10$XegE7Whprbyiq4wTgyNN9uguOMgBcQw3sE4x0x9fKy0ddvtijHtt6',
                name: 'John123',
                lastName: 'Doe',
                createdAt: '2024-09-02T07:01:47.724Z',
                updatedAt: '2024-09-02T07:01:47.724Z',
              },
              id: 2,
              text: 'Это ответ на комментарий',
              userId: 1,
              parentId: 1,
              createdAt: '2024-09-10T13:08:02.513Z',
            },
          ],
        },
        {
          id: 4,
          userId: 1,
          postId: 1,
          parentId: null,
          text: 'Это ответ на комментарий2',
          createdAt: '2024-09-10T13:12:34.086Z',
          updatedAt: '2024-09-10T13:12:34.086Z',
          replies: [],
          user: {
            id: 1,
            email: 'user@example.com',
            password:
              '$2b$10$XegE7Whprbyiq4wTgyNN9uguOMgBcQw3sE4x0x9fKy0ddvtijHtt6',
            name: 'John123',
            lastName: 'Doe',
            createdAt: '2024-09-02T07:01:47.724Z',
            updatedAt: '2024-09-02T07:01:47.724Z',
          },
        },
      ],
    },
  })
  async getComments(@Param('postId') postId: number) {
    return this.commentsService.getComments(postId);
  }
}
