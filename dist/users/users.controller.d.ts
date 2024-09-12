import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(page: number, size: number, search: string, req: any): Promise<{
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
    findOne(id: string): Promise<{
        id: number;
        email: string;
        password: string;
        name: string | null;
        lastName: string | null;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    uploadAvatar(file: Express.Multer.File, req: any): Promise<{
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
