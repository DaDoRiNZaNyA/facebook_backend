import { ApiProperty } from '@nestjs/swagger';

export class GetUserDto {
  @ApiProperty({
    description: 'ID ',
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 'test@example.com',
    description: 'Email пользователя',
  })
  email: string;

  @ApiProperty({ example: 'password123', description: 'Пароль пользователя' })
  password: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Имя пользователя',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'Creation date',
    example: '2024-09-03T05:17:30.367Z',
  })
  createdAt: string;

  @ApiProperty({
    description: 'Last update date',
    example: '2024-09-03T05:17:30.367Z',
  })
  updatedAt: string;

  @ApiProperty({
    description: 'Is user followed',
    example: false,
  })
  isFollowed: boolean;
}
