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
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetPostDto } from './dto/get-post.dto';
import { ApiOkResponsePaginated } from 'src/utils/ApiOkResponsePaginated';
import { OptionalJwtAuthGuard } from 'src/utils/OptionalJwtAuthGuard';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiBody({
    description: 'The data needed to create a new post',
    type: CreatePostDto,
  })
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
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthGuard)
  async create(@Body() createPostDto: CreatePostDto, @Req() req) {
    const userId = req.user.id;
    return this.postsService.create(createPostDto, userId);
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
}
