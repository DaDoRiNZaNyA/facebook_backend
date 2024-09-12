import { PrismaService } from 'src/prisma.service';
export declare class LikesService {
    private prisma;
    constructor(prisma: PrismaService);
    likePost(userId: number, postId: number, isLike: boolean): Promise<{
        message: string;
    }>;
    getLikesCount(postId: number): Promise<{
        likes: number;
        dislikes: number;
    }>;
}
