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
exports.CommentsController = void 0;
const common_1 = require("@nestjs/common");
const comments_service_1 = require("./comments.service");
const create_comment_dto_1 = require("./dto/create-comment.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const edit_comment_dto_1 = require("./dto/edit-comment.dto");
let CommentsController = class CommentsController {
    constructor(commentsService) {
        this.commentsService = commentsService;
    }
    createComment(createCommentDto, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.id;
            return this.commentsService.createComment(createCommentDto, userId);
        });
    }
    editComment(id, editCommentDto, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.id;
            return this.commentsService.editComment(id, editCommentDto.text, userId);
        });
    }
    deleteComment(id, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.id;
            return this.commentsService.deleteComment(id, userId);
        });
    }
    getComments(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.commentsService.getComments(postId);
        });
    }
};
exports.CommentsController = CommentsController;
__decorate([
    (0, common_1.Post)(''),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiResponse)({
        status: 201,
        schema: {
            example: {
                id: 1,
                userId: 1,
                postId: 1,
                parentId: null,
                text: 'Это комментарий',
                createdAt: '2024-09-10T13:06:44.300Z',
                updatedAt: '2024-09-10T13:06:44.300Z',
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_comment_dto_1.CreateCommentDto, Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "createComment", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiResponse)({
        status: 201,
        schema: {
            example: {
                id: 1,
                userId: 1,
                postId: 1,
                parentId: null,
                text: 'Это комментарий',
                createdAt: '2024-09-10T13:06:44.300Z',
                updatedAt: '2024-09-10T13:06:44.300Z',
            },
        },
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, edit_comment_dto_1.EditCommentDto, Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "editComment", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiResponse)({
        status: 201,
        schema: {
            example: {
                id: 1,
                userId: 1,
                postId: 1,
                parentId: null,
                text: 'Это комментарий',
                createdAt: '2024-09-10T13:06:44.300Z',
                updatedAt: '2024-09-10T13:06:44.300Z',
            },
        },
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "deleteComment", null);
__decorate([
    (0, common_1.Get)(':postId'),
    (0, swagger_1.ApiResponse)({
        status: 201,
        schema: {
            example: [
                {
                    id: 1,
                    userId: 1,
                    postId: 1,
                    parentId: null,
                    text: 'Это комментарий',
                    createdAt: '2024-09-10T13:06:44.300Z',
                    updatedAt: '2024-09-10T13:06:44.300Z',
                    replies: [
                        {
                            user: {
                                id: 1,
                                email: 'user@example.com',
                                password: '$2b$10$XegE7Whprbyiq4wTgyNN9uguOMgBcQw3sE4x0x9fKy0ddvtijHtt6',
                                name: 'John123',
                                lastName: 'Doe',
                                avatar: '/uploads/avatars/avatar-1726031224516-565290115.jpeg',
                                createdAt: '2024-09-02T07:01:47.724Z',
                                updatedAt: '2024-09-02T07:01:47.724Z',
                            },
                            id: 2,
                            text: 'Это ответ на комментарий',
                            userId: 1,
                            parentId: 1,
                            createdAt: '2024-09-10T13:08:02.513Z',
                        },
                    ],
                },
                {
                    id: 4,
                    userId: 1,
                    postId: 1,
                    parentId: null,
                    text: 'Это ответ на комментарий2',
                    createdAt: '2024-09-10T13:12:34.086Z',
                    updatedAt: '2024-09-10T13:12:34.086Z',
                    replies: [],
                    user: {
                        id: 1,
                        email: 'user@example.com',
                        password: '$2b$10$XegE7Whprbyiq4wTgyNN9uguOMgBcQw3sE4x0x9fKy0ddvtijHtt6',
                        name: 'John123',
                        avatar: '/uploads/avatars/avatar-1726031224516-565290115.jpeg',
                        lastName: 'Doe',
                        createdAt: '2024-09-02T07:01:47.724Z',
                        updatedAt: '2024-09-02T07:01:47.724Z',
                    },
                },
            ],
        },
    }),
    __param(0, (0, common_1.Param)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "getComments", null);
exports.CommentsController = CommentsController = __decorate([
    (0, swagger_1.ApiTags)('comments'),
    (0, common_1.Controller)('comments'),
    __metadata("design:paramtypes", [comments_service_1.CommentsService])
], CommentsController);
//# sourceMappingURL=comments.controller.js.map