import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
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
}
