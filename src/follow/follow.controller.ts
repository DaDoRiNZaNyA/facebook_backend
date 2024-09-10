import {
  Controller,
  Post,
  Param,
  Delete,
  Get,
  UseGuards,
  Req,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { FollowService } from './follow.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('follow')
@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    description: 'User has been successfully followed.',
    schema: {
      example: {
        id: 1,
        followerId: 2,
        followingId: 1,
        createdAt: '2024-09-09T06:18:49.924Z',
      },
    },
  })
  async followUser(@Param('id') followingId: number, @Req() req) {
    const followerId = req.user.id;
    return this.followService.followUser(followerId, +followingId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    description: 'User has been successfully followed.',
    schema: {
      example: {
        id: 3,
        followerId: 1,
        followingId: 2,
        createdAt: '2024-09-09T06:43:15.729Z',
      },
    },
  })
  async unfollowUser(@Param('id') followingId: number, @Req() req) {
    const followerId = req.user.id;
    return this.followService.unfollowUser(followerId, +followingId);
  }

  @Get('following')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    description: 'User has been successfully followed.',
    schema: {
      example: [
        {
          id: 1,
          followerId: 2,
          followingId: 1,
          createdAt: '2024-09-09T06:18:49.924Z',
          following: {
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
  async getFollowing(@Req() req) {
    const userId = req.user.id;
    return this.followService.getFollowing(+userId);
  }

  @Get('followers')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    schema: {
      example: {
        pagination: {
          total: 1,
          totalPages: 1,
          currentPage: 1,
          pageSize: 10,
        },
        data: [
          {
            id: 11,
            followerId: 2,
            followingId: 1,
            createdAt: '2024-09-10T09:40:58.334Z',
            following: {
              id: 1,
              email: 'user@example.com',
              password:
                '$2b$10$XegE7Whprbyiq4wTgyNN9uguOMgBcQw3sE4x0x9fKy0ddvtijHtt6',
              name: 'John123',
              lastName: 'Doe',
              createdAt: '2024-09-02T07:01:47.724Z',
              updatedAt: '2024-09-02T07:01:47.724Z',
            },
            isFollowed: false,
          },
        ],
      },
    },
  })
  async getFollowers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('size', new DefaultValuePipe(10), ParseIntPipe) size: number = 10,
    @Req() req,
  ) {
    const userId = req.user.id;
    return this.followService.getFollowers(+userId, page, size);
  }

  @Get('isUserFollowed/:id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    schema: {
      example: {
        isFollowed: true,
      },
    },
  })
  async getIsUserFollowed(@Param('id') followingId: number, @Req() req) {
    const userId = req.user.id;
    return this.followService.isUserFollowed(+userId, followingId);
  }
}
