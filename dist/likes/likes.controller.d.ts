import { LikesService } from './likes.service';
import { LikePostDto } from './dto/like-post.dto';
export declare class LikesController {
    private readonly likesService;
    constructor(likesService: LikesService);
    likePost(req: any, likePostDto: LikePostDto): Promise<{
        message: string;
    }>;
}
