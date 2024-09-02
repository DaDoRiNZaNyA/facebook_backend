import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.sto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully.',
    schema: {
      example: {
        accessToken: 'your-access-token',
        refreshToken: 'your-refresh-token',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  @ApiResponse({
    status: 200,
    description: 'Access token successfully refreshed.',
    schema: {
      example: {
        accessToken: 'your-new-access-token',
        refreshToken: 'your-new-refresh-token',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Invalid refresh token.',
  })
  async refresh(@Body() body: RefreshTokenDto) {
    const { accessToken } = await this.authService.refreshToken(
      body.refreshToken,
    );
    return { accessToken };
  }
}
