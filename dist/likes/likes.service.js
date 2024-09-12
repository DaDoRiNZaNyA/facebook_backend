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
exports.LikesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let LikesService = class LikesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    likePost(userId, postId, isLike) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingLike = yield this.prisma.like.findUnique({
                where: { userId_postId: { userId, postId } },
            });
            if (existingLike) {
                if (existingLike.isLike === isLike) {
                    yield this.prisma.like.delete({
                        where: { id: existingLike.id },
                    });
                    return { message: 'Like/dislike removed' };
                }
                else {
                    yield this.prisma.like.update({
                        where: { id: existingLike.id },
                        data: { isLike },
                    });
                    return { message: `Updated to ${isLike ? 'like' : 'dislike'}` };
                }
            }
            yield this.prisma.like.create({
                data: {
                    userId,
                    postId,
                    isLike,
                },
            });
            return { message: `${isLike ? 'Liked' : 'Disliked'} successfully` };
        });
    }
    getLikesCount(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const likes = yield this.prisma.like.count({
                where: { postId, isLike: true },
            });
            const dislikes = yield this.prisma.like.count({
                where: { postId, isLike: false },
            });
            return { likes, dislikes };
        });
    }
};
exports.LikesService = LikesService;
exports.LikesService = LikesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LikesService);
//# sourceMappingURL=likes.service.js.map