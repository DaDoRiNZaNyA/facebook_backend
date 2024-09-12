import { FollowService } from './follow.service';
export declare class FollowController {
    private readonly followService;
    constructor(followService: FollowService);
    followUser(followingId: number, req: any): Promise<{
        id: number;
        followerId: number;
        followingId: number;
        createdAt: Date;
    }>;
    unfollowUser(followingId: number, req: any): Promise<{
        id: number;
        followerId: number;
        followingId: number;
        createdAt: Date;
    }>;
    getFollowing(req: any): Promise<{
        id: number;
        followerId: number;
        followingId: number;
        createdAt: Date;
    }[]>;
    getFollowers(page: number, size: number, req: any): Promise<{
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
    getIsUserFollowed(followingId: number, req: any): Promise<{
        isFollowed: boolean;
    }>;
}
