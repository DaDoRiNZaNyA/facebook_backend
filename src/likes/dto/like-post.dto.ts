import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt } from 'class-validator';

export class LikePostDto {
  @ApiProperty({
    description: 'The ID of the post being liked or disliked',
    example: 1,
  })
  @IsInt()
  postId: number;

  @ApiProperty({
    description: 'Like or dislike the post',
    example: true,
  })
  @IsBoolean()
  isLike: boolean;
}
