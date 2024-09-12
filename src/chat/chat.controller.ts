import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { CreateChatGroupDto } from './dto/create-chat-group.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post('create-group')
  @ApiOperation({ summary: 'Создать группу для чата' })
  @ApiBody({
    description:
      'Список пользователей, которые будут участниками группы, и название группы (необязательно)',
    type: CreateChatGroupDto,
  })
  @ApiResponse({
    status: 201,
    example: {
      id: 1,
      name: null,
      createdAt: '2024-09-11T14:15:30.844Z',
      updatedAt: '2024-09-11T14:15:30.844Z',
      participants: [
        {
          id: 1,
          userId: 1,
          chatGroupId: 1,
          isAdmin: false,
          lastReadAt: null,
        },
        {
          id: 2,
          userId: 2,
          chatGroupId: 1,
          isAdmin: false,
          lastReadAt: null,
        },
      ],
    },
  })
  @UseGuards(AuthGuard('jwt'))
  async createGroup(@Body() data: CreateChatGroupDto) {
    return this.chatService.createChatGroup(data.userIds, data.name);
  }
}
