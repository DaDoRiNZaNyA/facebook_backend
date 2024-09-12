declare class UserDto {
    id: number;
    name: string;
    lastName: string;
    avatar?: string;
}
export declare class GetPostDto {
    id: number;
    user: UserDto;
    text: string;
    media: any[];
    createdAt: string;
    updatedAt: string;
    totalLikes: number;
    totalDislikes: number;
    totalComments: number;
    userReaction: string | null;
}
export {};
