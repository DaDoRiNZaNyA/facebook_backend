import { PostsService } from './posts.service';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(body: any, media: Array<Express.Multer.File>, req: any): Promise<{
        id: number;
        userId: number;
        text: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updatePostDto: UpdatePostDto, req: any): Promise<{
        id: number;
        userId: number;
        text: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(page?: number, size?: number, search?: string, userId?: number, req?: any): Promise<{
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
    findOne(id: string, req?: any): Promise<{
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
    findMyPosts(page: number, size: number, search: string, req: any): Promise<{
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
    remove(id: string, req: any): Promise<{
        id: number;
        userId: number;
        text: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    addMedia(postId: number, media: Array<Express.Multer.File>, req: any): Promise<void>;
    removeMedia(postId: number, body: {
        mediaIds: number[];
    }, req: any): Promise<void>;
}
