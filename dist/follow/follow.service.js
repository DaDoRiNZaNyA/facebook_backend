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
exports.FollowService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const pagination_1 = require("../utils/pagination");
let FollowService = class FollowService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    followUser(followerId, followingId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (followerId === followingId) {
                throw new Error('Невозможно подписаться на самого себя');
            }
            const existingFollow = yield this.prisma.follow.findFirst({
                where: { followerId, followingId },
            });
            if (existingFollow) {
                throw new Error('Вы уже подписаны на этого пользователя');
            }
            return this.prisma.follow.create({
                data: {
                    followerId,
                    followingId,
                },
            });
        });
    }
    unfollowUser(followerId, followingId) {
        return __awaiter(this, void 0, void 0, function* () {
            const follow = yield this.prisma.follow.findFirst({
                where: { followerId, followingId },
            });
            if (!follow) {
                throw new common_1.NotFoundException('Подписка не найдена');
            }
            return yield this.prisma.follow.delete({
                where: { id: follow.id },
            });
        });
    }
    getFollowing(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.follow.findMany({
                where: { followerId: userId },
                include: {
                    following: true,
                },
            });
        });
    }
    getFollowers(userId, page, size) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = {
                followingId: userId,
            };
            const [follows, total] = yield this.prisma.$transaction([
                this.prisma.follow.findMany({
                    skip: (page - 1) * size,
                    take: size,
                    where: where,
                    include: {
                        follower: {
                            select: {
                                id: true,
                                name: true,
                                lastName: true,
                                avatar: true,
                                followers: {
                                    select: {
                                        followerId: true,
                                    },
                                    where: {
                                        followerId: userId,
                                    },
                                },
                            },
                        },
                    },
                }),
                this.prisma.follow.count({ where }),
            ]);
            const followsWithFollowStatus = follows.map((data) => ({
                id: data.id,
                followerId: data.followerId,
                followingId: data.followingId,
                isFollowed: data.follower.followers.length > 0,
                follower: {
                    name: data.follower.name,
                    lastName: data.follower.lastName,
                    id: data.follower.id,
                    avatar: data.follower.avatar,
                },
            }));
            const pagination = (0, pagination_1.paginate)(total, size, page);
            return { pagination, data: followsWithFollowStatus };
        });
    }
    isUserFollowed(followerId, followingId) {
        return __awaiter(this, void 0, void 0, function* () {
            const followRecord = yield this.prisma.follow.findFirst({
                where: {
                    followerId: followerId,
                    followingId: followingId,
                },
            });
            return {
                isFollowed: !!followRecord,
            };
        });
    }
};
exports.FollowService = FollowService;
exports.FollowService = FollowService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FollowService);
//# sourceMappingURL=follow.service.js.map