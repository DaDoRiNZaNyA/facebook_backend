import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    createUser(data: CreateUserDto): Promise<{
        id: number;
        email: string;
        password: string;
        name: string | null;
        lastName: string | null;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(params: {
        page?: number;
        size?: number;
        search?: string;
        userId: number;
    }): Promise<{
        pagination: {
            total: number;
            totalPages: number;
            currentPage: number;
            pageSize: number;
        };
        data: {
            isFollowed: boolean;
            name: string;
            email: string;
            id: number;
            lastName: string;
            avatar: string;
        }[];
    }>;
    findOne(id: number): Promise<{
        id: number;
        email: string;
        password: string;
        name: string | null;
        lastName: string | null;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteUser(id: number): Promise<{
        id: number;
        email: string;
        password: string;
        name: string | null;
        lastName: string | null;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByEmail(email: string): Promise<User | null>;
    updateUser({ id, name, lastName, email, }: {
        id: number;
        name: string;
        lastName?: string;
        email: string;
    }): Promise<{
        id: number;
        email: string;
        password: string;
        name: string | null;
        lastName: string | null;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateAvatar(userId: number, avatarPath: string): Promise<{
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
