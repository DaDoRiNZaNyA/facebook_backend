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
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const posts_service_1 = require("./posts.service");
const update_post_dto_1 = require("./dto/update-post.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const get_post_dto_1 = require("./dto/get-post.dto");
const ApiOkResponsePaginated_1 = require("../utils/ApiOkResponsePaginated");
const OptionalJwtAuthGuard_1 = require("../utils/OptionalJwtAuthGuard");
const platform_express_1 = require("@nestjs/platform-express");
const create_post_dto_1 = require("./dto/create-post.dto");
const add_media_dto_1 = require("./dto/add-media.dto");
let PostsController = class PostsController {
    constructor(postsService) {
        this.postsService = postsService;
    }
    create(body, media, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.id;
            return this.postsService.create(body, media, userId);
        });
    }
    update(id, updatePostDto, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.id;
            return this.postsService.update(id, updatePostDto, userId);
        });
    }
    findAll(page = 1, size = 10, search = '', userId, req) {
        var _a;
        const authUserId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        return this.postsService.findAll({
            page,
            size,
            search,
            userId,
            authUserId,
        });
    }
    findOne(id, req) {
        var _a;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        return this.postsService.findOne(+id, userId);
    }
    findMyPosts(page = 1, size = 10, search = '', req) {
        const userId = req.user.id;
        return this.postsService.findByUser({ page, size, search, userId });
    }
    remove(id, req) {
        const userId = req.user.id;
        return this.postsService.remove(id, userId);
    }
    addMedia(postId, media, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.id;
            return this.postsService.addMediaToPost(postId, media, userId);
        });
    }
    removeMedia(postId, body, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.id;
            return this.postsService.removeMediaFromPost(postId, body.mediaIds, userId);
        });
    }
};
exports.PostsController = PostsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new post' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Post successfully created',
        schema: {
            example: {
                id: 12,
                userId: 1,
                text: 'qweqwe',
                media: null,
                createdAt: '2024-09-03T05:17:30.367Z',
                updatedAt: '2024-09-03T05:17:30.367Z',
            },
        },
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        type: create_post_dto_1.CreatePostDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('media')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing post' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Post successfully updated',
        schema: {
            example: {
                id: 12,
                userId: 1,
                text: 'qweqwe',
                media: null,
                createdAt: '2024-09-03T05:17:30.367Z',
                updatedAt: '2024-09-03T05:17:30.367Z',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Post not found',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_post_dto_1.UpdatePostDto, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get posts' }),
    (0, ApiOkResponsePaginated_1.ApiOkResponsePaginated)(get_post_dto_1.GetPostDto),
    (0, common_1.UseGuards)(OptionalJwtAuthGuard_1.OptionalJwtAuthGuard),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('size', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('userId')),
    __param(4, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, Number, Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('post/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get post by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'post ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        type: get_post_dto_1.GetPostDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Post not found.' }),
    (0, common_1.UseGuards)(OptionalJwtAuthGuard_1.OptionalJwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('my'),
    (0, swagger_1.ApiOperation)({ summary: 'Get my posts' }),
    (0, ApiOkResponsePaginated_1.ApiOkResponsePaginated)(get_post_dto_1.GetPostDto),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('size', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "findMyPosts", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete post' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'post ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        type: get_post_dto_1.GetPostDto,
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Post not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':postId/media'),
    (0, swagger_1.ApiOperation)({ summary: 'Add media files to a post' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        type: add_media_dto_1.AddMediaDto,
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('media')),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "addMedia", null);
__decorate([
    (0, common_1.Delete)(':postId/media'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove media files from a post' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Media files successfully removed from the post',
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            example: { mediaIds: [1, 2, 3] },
        },
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "removeMedia", null);
exports.PostsController = PostsController = __decorate([
    (0, swagger_1.ApiTags)('posts'),
    (0, common_1.Controller)('posts'),
    __metadata("design:paramtypes", [posts_service_1.PostsService])
], PostsController);
//# sourceMappingURL=posts.controller.js.map