import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The text content of the post',
    example: 'qweqwe',
  })
  text?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The media URL or path',
    example: '/lisk',
    nullable: true,
  })
  media?: string;
}
