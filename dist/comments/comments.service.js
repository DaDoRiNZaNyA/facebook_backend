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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let CommentsService = class CommentsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    createComment(dto, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.comment.create({
                data: {
                    userId: userId,
                    postId: dto.postId,
                    parentId: dto.parentId,
                    text: dto.text,
                },
            });
        });
    }
    editComment(id, text, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield this.prisma.comment.findUnique({
                where: { id },
                select: { userId: true },
            });
            if (!comment)
                throw new common_1.NotFoundException('Comment not found');
            if (comment.userId !== userId)
                throw new common_1.NotFoundException('Not allowed');
            return this.prisma.comment.update({
                where: { id },
                data: { text },
            });
        });
    }
    deleteComment(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield this.prisma.comment.findUnique({
                where: { id },
                select: { userId: true },
            });
            if (!comment)
                throw new common_1.NotFoundException('Comment not found');
            if (comment.userId !== userId)
                throw new common_1.NotFoundException('Not allowed');
            return this.prisma.comment.delete({
                where: { id },
            });
        });
    }
    getComments(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comments = yield this.prisma.comment.findMany({
                where: { postId },
                orderBy: { createdAt: 'asc' },
                include: {
                    replies: {
                        orderBy: { createdAt: 'asc' },
                        select: {
                            user: true,
                            id: true,
                            text: true,
                            userId: true,
                            parentId: true,
                            createdAt: true,
                        },
                    },
                    user: true,
                },
            });
            const replyCommentIds = new Set(comments.flatMap((comment) => comment.replies.map((reply) => reply.id)));
            const topLevelComments = comments.filter((comment) => !replyCommentIds.has(comment.id));
            return topLevelComments;
        });
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CommentsService);
//# sourceMappingURL=comments.service.js.map