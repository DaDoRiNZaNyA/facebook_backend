import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'ID поста, к которому оставляется комментарий',
    example: 1,
  })
  @IsInt()
  postId: number;

  @ApiProperty({
    description: 'ID родительского комментария, если это ответ',
    example: 2,
    required: false,
  })
  @IsOptional()
  @IsInt()
  parentId?: number;

  @ApiProperty({
    description: 'Текст комментария',
    example: 'Это комментарий',
  })
  @IsString()
  text: string;
}
