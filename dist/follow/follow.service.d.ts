import { Follow } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
export declare class FollowService {
    private prisma;
    constructor(prisma: PrismaService);
    followUser(followerId: number, followingId: number): Promise<Follow>;
    unfollowUser(followerId: number, followingId: number): Promise<Follow>;
    getFollowing(userId: number): Promise<Follow[]>;
    getFollowers(userId: number, page: number, size: number): Promise<{
        pagination: {
            total: number;
            totalPages: number;
            currentPage: number;
            pageSize: number;
        };
        data: {
            id: number;
            followerId: number;
            followingId: number;
            isFollowed: boolean;
            follower: {
                name: string;
                lastName: string;
                id: number;
                avatar: string;
            };
        }[];
    }>;
    isUserFollowed(followerId: number, followingId: number): Promise<{
        isFollowed: boolean;
    }>;
}
