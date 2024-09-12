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
exports.FollowController = void 0;
const common_1 = require("@nestjs/common");
const follow_service_1 = require("./follow.service");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let FollowController = class FollowController {
    constructor(followService) {
        this.followService = followService;
    }
    followUser(followingId, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const followerId = req.user.id;
            return this.followService.followUser(followerId, +followingId);
        });
    }
    unfollowUser(followingId, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const followerId = req.user.id;
            return this.followService.unfollowUser(followerId, +followingId);
        });
    }
    getFollowing(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.id;
            return this.followService.getFollowing(+userId);
        });
    }
    getFollowers() {
        return __awaiter(this, arguments, void 0, function* (page = 1, size = 10, req) {
            const userId = req.user.id;
            return this.followService.getFollowers(+userId, page, size);
        });
    }
    getIsUserFollowed(followingId, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.id;
            return this.followService.isUserFollowed(+userId, followingId);
        });
    }
};
exports.FollowController = FollowController;
__decorate([
    (0, common_1.Post)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'User has been successfully followed.',
        schema: {
            example: {
                id: 1,
                followerId: 2,
                followingId: 1,
                createdAt: '2024-09-09T06:18:49.924Z',
            },
        },
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "followUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'User has been successfully followed.',
        schema: {
            example: {
                id: 3,
                followerId: 1,
                followingId: 2,
                createdAt: '2024-09-09T06:43:15.729Z',
            },
        },
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "unfollowUser", null);
__decorate([
    (0, common_1.Get)('following'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'User has been successfully followed.',
        schema: {
            example: [
                {
                    id: 1,
                    followerId: 2,
                    followingId: 1,
                    createdAt: '2024-09-09T06:18:49.924Z',
                    following: {
                        id: 1,
                        email: 'user@example.com',
                        password: '$2b$10$XegE7Whprbyiq4wTgyNN9uguOMgBcQw3sE4x0x9fKy0ddvtijHtt6',
                        name: 'John123',
                        lastName: 'Doe',
                        avatar: null,
                        createdAt: '2024-09-02T07:01:47.724Z',
                        updatedAt: '2024-09-02T07:01:47.724Z',
                    },
                },
            ],
        },
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "getFollowing", null);
__decorate([
    (0, common_1.Get)('followers'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiResponse)({
        status: 201,
        schema: {
            example: {
                pagination: {
                    total: 1,
                    totalPages: 1,
                    currentPage: 1,
                    pageSize: 10,
                },
                data: [
                    {
                        id: 11,
                        followerId: 2,
                        followingId: 1,
                        createdAt: '2024-09-10T09:40:58.334Z',
                        following: {
                            id: 1,
                            email: 'user@example.com',
                            password: '$2b$10$XegE7Whprbyiq4wTgyNN9uguOMgBcQw3sE4x0x9fKy0ddvtijHtt6',
                            name: 'John123',
                            lastName: 'Doe',
                            avatar: null,
                            createdAt: '2024-09-02T07:01:47.724Z',
                            updatedAt: '2024-09-02T07:01:47.724Z',
                        },
                        isFollowed: false,
                    },
                ],
            },
        },
    }),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('size', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "getFollowers", null);
__decorate([
    (0, common_1.Get)('isUserFollowed/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiResponse)({
        status: 201,
        schema: {
            example: {
                isFollowed: true,
            },
        },
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "getIsUserFollowed", null);
exports.FollowController = FollowController = __decorate([
    (0, swagger_1.ApiTags)('follow'),
    (0, common_1.Controller)('follow'),
    __metadata("design:paramtypes", [follow_service_1.FollowService])
], FollowController);
//# sourceMappingURL=follow.controller.js.map