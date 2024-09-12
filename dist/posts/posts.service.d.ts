import { PrismaService } from 'src/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createPostDto: CreatePostDto, media: Array<Express.Multer.File>, userId: number): Promise<{
        id: number;
        userId: number;
        text: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    addMediaToPost(postId: number, files: Array<Express.Multer.File>, userId: number): Promise<void>;
    removeMediaFromPost(postId: number, mediaIds: number[], userId: number): Promise<void>;
    update(id: string, updatePostDto: UpdatePostDto, userId: number): Promise<{
        id: number;
        userId: number;
        text: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string, userId: number): Promise<{
        id: number;
        userId: number;
        text: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(params: {
        page?: number;
        size?: number;
        search?: string;
        userId?: number;
        authUserId?: number;
    }): Promise<{
        pagination: {
            total: number;
            totalPages: number;
            currentPage: number;
            pageSize: number;
        };
        data: {
            totalLikes: number;
            totalDislikes: number;
            totalComments: number;
            userReaction: string;
            user: {
                name: string;
                id: number;
                lastName: string;
                avatar: string;
            };
            media: {
                id: number;
                postId: number;
                url: string;
                type: string;
                createdAt: Date;
            }[];
            id: number;
            createdAt: Date;
            updatedAt: Date;
            text: string;
        }[];
    }>;
    findOne(id: number, userId?: number): Promise<{
        totalLikes: number;
        totalDislikes: number;
        totalComments: number;
        userReaction: string;
        user: {
            name: string;
            id: number;
            lastName: string;
            avatar: string;
        };
        media: {
            id: number;
            postId: number;
            url: string;
            type: string;
            createdAt: Date;
        }[];
        id: number;
        createdAt: Date;
        updatedAt: Date;
        text: string;
    }>;
    findByUser(params: {
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
            totalLikes: number;
            totalDislikes: number;
            totalComments: number;
            userReaction: string;
            user: {
                name: string;
                id: number;
                lastName: string;
                avatar: string;
            };
            media: {
                id: number;
                postId: number;
                url: string;
                type: string;
                createdAt: Date;
            }[];
            id: number;
            createdAt: Date;
            updatedAt: Date;
            text: string;
        }[];
    }>;
}
