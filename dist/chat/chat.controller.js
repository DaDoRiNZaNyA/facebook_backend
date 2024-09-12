"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const chat_service_1 = require("./chat.service");
const create_chat_group_dto_1 = require("./dto/create-chat-group.dto");
const passport_1 = require("@nestjs/passport");
let ChatController = class ChatController {
    constructor(chatService) {
        this.chatService = chatService;
    }
    createGroup(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.chatService.createChatGroup(data.userIds, data.name);
        });
    }
};
exports.ChatController = ChatController;
__decorate([
    (0, common_1.Post)('create-group'),
    (0, swagger_1.ApiOperation)({ summary: 'Создать группу для чата' }),
    (0, swagger_1.ApiBody)({
        description: 'Список пользователей, которые будут участниками группы, и название группы (необязательно)',
        type: create_chat_group_dto_1.CreateChatGroupDto,
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_chat_group_dto_1.CreateChatGroupDto]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "createGroup", null);
exports.ChatController = ChatController = __decorate([
    (0, swagger_1.ApiTags)('chat'),
    (0, common_1.Controller)('chat'),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatController);
//# sourceMappingURL=chat.controller.js.map