import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateChatGroupDto {
  @ApiProperty({
    description:
      'Массив идентификаторов пользователей, которые будут участниками группы',
    example: [1, 2, 3],
  })
  @IsArray()
  userIds: number[];

  @ApiProperty({
    description: 'Название группы (необязательное поле)',
    example: 'Рабочая группа',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;
}
