import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LikesService } from './likes.service';
import { LikePostDto } from './dto/like-post.dto';

@ApiTags('likes')
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    schema: {
      example: {
        message: 'Liked successfully',
      },
    },
  })
  async likePost(@Req() req, @Body() likePostDto: LikePostDto) {
    const userId = req.user.id;
    return this.likesService.likePost(
      userId,
      likePostDto.postId,
      likePostDto.isLike,
    );
  }
}
