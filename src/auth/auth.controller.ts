import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.sto';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user,dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

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
    const { accessToken, refreshToken } = await this.authService.refreshToken(
      body.refreshToken,
    );
    return { accessToken, refreshToken };
  }

  @Get('getProfile')
  @ApiResponse({
    status: 200,
    description: 'Get my profile',
    schema: {
      example: {
        id: 1,
        email: 'pJn9Z@example.com',
        name: 'John',
        lastName: 'Doe',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Invalid refresh token.',
  })
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Request() req) {
    const token = req.headers.authorization.split(' ')[1];
    return this.authService.getProfile(token);
  }

  @Put('updateProfile')
  @ApiResponse({
    status: 200,
    description: 'Update my profile',
    schema: {
      example: {
        email: 'pJn9Z@example.com',
        name: 'John',
        lastName: 'Doe',
        avatar: '/uploads/avatars/avatar-1726031224516-565290115.jpeg',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Invalid refresh token.',
  })
  @ApiBody({
    type: UpdateUserDto,
  })
  @UseGuards(AuthGuard('jwt'))
  async updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = this.jwtService.verify(token);

    const user = await this.userService.findOne(decoded.sub);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return this.userService.updateUser({
      id: user.id,
      name: updateUserDto.name,
      lastName: updateUserDto.lastName,
      email: updateUserDto.email,
    });
  }
}
