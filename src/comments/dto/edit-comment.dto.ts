import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class EditCommentDto {
  @ApiProperty({
    description: 'Текст комментария',
    example: 'Это комментарий',
  })
  @IsString()
  text: string;
}
