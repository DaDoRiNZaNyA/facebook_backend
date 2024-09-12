import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.sto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user,dto';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    private readonly jwtService;
    constructor(authService: AuthService, userService: UsersService, jwtService: JwtService);
    register(createUserDto: CreateUserDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refresh(body: RefreshTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    getProfile(req: any): Promise<{
        id: number;
        email: string;
        name: string;
        lastName: string;
        avatar: string;
    }>;
    updateProfile(req: any, updateUserDto: UpdateUserDto): Promise<{
        id: number;
        email: string;
        password: string;
        name: string | null;
        lastName: string | null;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
