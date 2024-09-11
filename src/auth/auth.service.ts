import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: 'your_refresh_token_secret',
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async register(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.usersService.createUser({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.login({ email: user.email, password: createUserDto.password });
  }

  async refreshToken(refreshToken: string) {
    try {
      const { sub } = this.jwtService.verify(refreshToken, {
        secret: 'your_refresh_token_secret',
      });
      const user = await this.usersService.findOne(sub);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const payload = { sub: user.id, email: user.email };
      const accessToken = this.jwtService.sign(payload);
      const newRefreshToken = this.jwtService.sign(payload, {
        secret: 'your_refresh_token_secret',
        expiresIn: '7d',
      });

      return { accessToken, refreshToken: newRefreshToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token', error);
    }
  }

  async getProfile(token: string) {
    try {
      const decoded = this.jwtService.verify(token);

      const user = await this.usersService.findOne(decoded.sub);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        avatar: user.avatar,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid token', error);
    }
  }
}
