import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { EditCommentDto } from './dto/edit-comment.dto';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    createComment(createCommentDto: CreateCommentDto, req: any): Promise<{
        id: number;
        userId: number;
        postId: number;
        parentId: number | null;
        text: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    editComment(id: number, editCommentDto: EditCommentDto, req: any): Promise<{
        id: number;
        userId: number;
        postId: number;
        parentId: number | null;
        text: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteComment(id: number, req: any): Promise<{
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
