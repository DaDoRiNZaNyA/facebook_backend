import { ChatService } from './chat.service';
import { CreateChatGroupDto } from './dto/create-chat-group.dto';
export declare class ChatController {
    private chatService;
    constructor(chatService: ChatService);
    createGroup(data: CreateChatGroupDto): Promise<{
        participants: {
            id: number;
            userId: number;
            chatGroupId: number;
            isAdmin: boolean;
            lastReadAt: Date | null;
        }[];
    } & {
        id: number;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
