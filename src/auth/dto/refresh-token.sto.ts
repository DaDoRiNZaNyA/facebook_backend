import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    description: 'Your refresh token',
    example: 'refresh_token',
  })
  @IsString()
  refreshToken: string;
}
