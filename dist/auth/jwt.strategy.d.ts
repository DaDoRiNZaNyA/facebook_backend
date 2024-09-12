import { Strategy } from 'passport-jwt';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly usersService;
    constructor(usersService: UsersService);
    validate(payload: {
        sub: number;
        email: string;
    }): Promise<User>;
}
export {};
