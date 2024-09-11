import { ApiProperty } from '@nestjs/swagger';

class UserDto {
  @ApiProperty({
    description: 'user ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Name of the user',
    example: 'John123',
  })
  name: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe',
  })
  lastName: string;

  @ApiProperty({
    example: '/uploads/avatars/avatar-1726031224516-565290115.jpeg',
    description: 'avatar',
    required: false,
  })
  avatar?: string;
}

export class GetPostDto {
  @ApiProperty({
    description: 'ID of the post',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'User who created the post',
    type: UserDto,
  })
  user: UserDto;

  @ApiProperty({
    description: 'Text content of the post',
    example: 'Sample text',
  })
  text: string;

  @ApiProperty({
    description: 'Media URL or path',
    example: '/media/sample.jpg',
    nullable: true,
  })
  media: string | null;

  @ApiProperty({
    description: 'Creation date of the post',
    example: '2024-09-03T05:17:30.367Z',
  })
  createdAt: string;

  @ApiProperty({
    description: 'Last update date of the post',
    example: '2024-09-03T05:17:30.367Z',
  })
  updatedAt: string;

  @ApiProperty({
    description: 'totalLikes',
    example: 1,
  })
  totalLikes: number;

  @ApiProperty({
    description: 'totalDislikes',
    example: 1,
  })
  totalDislikes: number;

  @ApiProperty({
    description: 'totalComments',
    example: 1,
  })
  totalComments: number;

  @ApiProperty({
    description: 'userReaction',
    example: 'like',
  })
  userReaction: string | null;
}
