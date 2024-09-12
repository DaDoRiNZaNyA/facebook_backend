import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from 'src/prisma.service';
export declare class CommentsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createComment(dto: CreateCommentDto, userId: number): Promise<{
        id: number;
        userId: number;
        postId: number;
        parentId: number | null;
        text: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    editComment(id: number, text: string, userId: number): Promise<{
        id: number;
        userId: number;
        postId: number;
        parentId: number | null;
        text: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteComment(id: number, userId: number): Promise<{
        id: number;
        userId: number;
        postId: number;
        parentId: number | null;
        text: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getComments(postId: number): Promise<({
        user: {
            id: number;
            email: string;
            password: string;
            name: string | null;
            lastName: string | null;
            avatar: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        replies: {
            user: {
                id: number;
                email: string;
                password: string;
                name: string | null;
                lastName: string | null;
                avatar: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
            id: number;
            createdAt: Date;
            text: string;
            userId: number;
            parentId: number;
        }[];
    } & {
        id: number;
        userId: number;
        postId: number;
        parentId: number | null;
        text: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
}
