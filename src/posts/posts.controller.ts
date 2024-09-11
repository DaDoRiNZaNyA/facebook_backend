import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { UpdatePostDto } from './dto/update-post.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetPostDto } from './dto/get-post.dto';
import { ApiOkResponsePaginated } from 'src/utils/ApiOkResponsePaginated';
import { OptionalJwtAuthGuard } from 'src/utils/OptionalJwtAuthGuard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from './dto/create-post.dto';
import { AddMediaDto } from './dto/add-media.dto';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({
    status: 201,
    description: 'Post successfully created',
    schema: {
      example: {
        id: 12,
        userId: 1,
        text: 'qweqwe',
        media: null,
        createdAt: '2024-09-03T05:17:30.367Z',
        updatedAt: '2024-09-03T05:17:30.367Z',
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreatePostDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('media'))
  async create(
    @Body() body,
    @UploadedFiles() media: Array<Express.Multer.File>,
    @Req() req,
  ) {
    const userId = req.user.id;
    return this.postsService.create(body, media, userId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing post' })
  @ApiResponse({
    status: 200,
    description: 'Post successfully updated',
    schema: {
      example: {
        id: 12,
        userId: 1,
        text: 'qweqwe',
        media: null,
        createdAt: '2024-09-03T05:17:30.367Z',
        updatedAt: '2024-09-03T05:17:30.367Z',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Post not found',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Req() req,
  ) {
    const userId = req.user.id;
    return this.postsService.update(id, updatePostDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get posts' })
  @ApiOkResponsePaginated(GetPostDto)
  @UseGuards(OptionalJwtAuthGuard)
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('size', new DefaultValuePipe(10), ParseIntPipe) size: number = 10,
    @Query('search') search: string = '',
    @Query('userId') userId?: number,
    @Req() req?: any,
  ) {
    const authUserId = req.user?.id;
    return this.postsService.findAll({
      page,
      size,
      search,
      userId,
      authUserId,
    });
  }

  @Get('post/:id')
  @ApiOperation({ summary: 'Get post by ID' })
  @ApiParam({ name: 'id', description: 'post ID' })
  @ApiResponse({
    status: 200,
    type: GetPostDto,
  })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  @UseGuards(OptionalJwtAuthGuard)
  findOne(@Param('id') id: string, @Req() req?: any) {
    const userId = req.user?.id;
    return this.postsService.findOne(+id, userId);
  }

  @Get('my')
  @ApiOperation({ summary: 'Get my posts' })
  @ApiOkResponsePaginated(GetPostDto)
  @UseGuards(JwtAuthGuard)
  findMyPosts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('size', new DefaultValuePipe(10), ParseIntPipe) size: number = 10,
    @Query('search') search: string = '',
    @Req() req,
  ) {
    const userId = req.user.id;
    return this.postsService.findByUser({ page, size, search, userId });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete post' })
  @ApiParam({ name: 'id', description: 'post ID' })
  @ApiResponse({
    status: 200,
    type: GetPostDto,
  })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 404, description: 'Post not found.' })
  remove(@Param('id') id: string, @Req() req) {
    const userId = req.user.id;
    return this.postsService.remove(id, userId);
  }

  @Post(':postId/media')
  @ApiOperation({ summary: 'Add media files to a post' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: AddMediaDto,
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('media'))
  async addMedia(
    @Param('postId') postId: number,
    @UploadedFiles() media: Array<Express.Multer.File>,
    @Req() req,
  ) {
    const userId = req.user.id;
    return this.postsService.addMediaToPost(postId, media, userId);
  }

  @Delete(':postId/media')
  @ApiOperation({ summary: 'Remove media files from a post' })
  @ApiResponse({
    status: 200,
    description: 'Media files successfully removed from the post',
  })
  @ApiBody({
    schema: {
      example: { mediaIds: [1, 2, 3] },
    },
  })
  @UseGuards(JwtAuthGuard)
  async removeMedia(
    @Param('postId') postId: number,
    @Body() body: { mediaIds: number[] },
    @Req() req,
  ) {
    const userId = req.user.id;
    return this.postsService.removeMediaFromPost(postId, body.mediaIds, userId);
  }
}
