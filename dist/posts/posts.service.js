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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const pagination_1 = require("../utils/pagination");
const path_1 = require("path");
const fs_1 = require("fs");
let PostsService = class PostsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createPostDto, media, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { text } = createPostDto;
            const uploadDir = (0, path_1.join)(__dirname, '../../uploads/posts');
            if (!(0, fs_1.existsSync)(uploadDir)) {
                (0, fs_1.mkdirSync)(uploadDir, { recursive: true });
            }
            const mediaRecords = media.map((file) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                const filename = `post-${uniqueSuffix}${ext}`;
                const filePath = (0, path_1.join)(uploadDir, filename);
                (0, fs_1.writeFileSync)(filePath, file.buffer);
                const relativeUrl = `/uploads/posts/${filename}`;
                return {
                    url: relativeUrl,
                    type: file.mimetype,
                };
            });
            return this.prisma.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                const post = yield prisma.post.create({
                    data: {
                        text,
                        userId,
                    },
                });
                const mediaPromises = mediaRecords.map((record) => prisma.media.create({
                    data: {
                        postId: post.id,
                        url: record.url,
                        type: record.type,
                    },
                }));
                yield Promise.all(mediaPromises);
                return post;
            }));
        });
    }
    addMediaToPost(postId, files, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.prisma.post.findUnique({
                where: { id: Number(postId) },
            });
            if (!post) {
                throw new common_1.NotFoundException('Post not found');
            }
            if (post.userId !== userId) {
                throw new common_1.UnauthorizedException('You are not allowed to edit this post');
            }
            const uploadDir = (0, path_1.join)(__dirname, '../../uploads/posts');
            const mediaRecords = files.map((file) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                const filename = `post-${uniqueSuffix}${ext}`;
                const filePath = (0, path_1.join)(uploadDir, filename);
                (0, fs_1.writeFileSync)(filePath, file.buffer);
                const relativeUrl = `/uploads/posts/${filename}`;
                return {
                    url: relativeUrl,
                    type: file.mimetype,
                };
            });
            const mediaPromises = mediaRecords.map((record) => this.prisma.media.create({
                data: {
                    postId,
                    url: record.url,
                    type: record.type,
                },
            }));
            yield Promise.all(mediaPromises);
        });
    }
    removeMediaFromPost(postId, mediaIds, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.prisma.post.findUnique({
                where: { id: Number(postId) },
            });
            if (!post) {
                throw new common_1.NotFoundException('Post not found');
            }
            if (post.userId !== userId) {
                throw new common_1.UnauthorizedException('You are not allowed to edit this post');
            }
            const mediaRecords = yield this.prisma.media.findMany({
                where: {
                    id: { in: mediaIds },
                },
            });
            mediaRecords.forEach((record) => {
                const filePath = (0, path_1.join)(__dirname, '../../uploads/posts', record.url.replace('/uploads/posts/', ''));
                (0, fs_1.unlinkSync)(filePath);
            });
            yield this.prisma.media.deleteMany({
                where: {
                    id: { in: mediaIds },
                },
            });
        });
    }
    update(id, updatePostDto, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.prisma.post.findUnique({
                where: { id: Number(id) },
            });
            if (!post) {
                throw new common_1.NotFoundException('Post not found');
            }
            if (post.userId !== userId) {
                throw new common_1.UnauthorizedException('You are not allowed to edit this post');
            }
            return this.prisma.post.update({
                where: { id: Number(id) },
                data: updatePostDto,
            });
        });
    }
    remove(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.prisma.post.findUnique({
                where: { id: Number(id) },
                include: { media: true },
            });
            if (!post) {
                throw new common_1.NotFoundException('Post not found');
            }
            if (post.userId !== userId) {
                throw new common_1.UnauthorizedException('You are not allowed to delete this post');
            }
            const uploadDir = (0, path_1.join)(__dirname, '../../uploads/posts');
            post.media.forEach((media) => {
                const filePath = (0, path_1.join)(uploadDir, media.url.replace('/uploads/posts/', ''));
                try {
                    (0, fs_1.unlinkSync)(filePath);
                }
                catch (err) {
                    console.error(`Failed to delete file at ${filePath}:`, err);
                }
            });
            yield this.prisma.media.deleteMany({
                where: { postId: Number(id) },
            });
            return this.prisma.post.delete({ where: { id: Number(id) } });
        });
    }
    findAll(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page = 1, size = 10, search = '', userId, authUserId } = params;
            const where = {
                AND: [
                    {
                        OR: [
                            { text: { contains: search, mode: 'insensitive' } },
                            { user: { name: { contains: search, mode: 'insensitive' } } },
                            { user: { lastName: { contains: search, mode: 'insensitive' } } },
                        ],
                    },
                    userId ? { userId: Number(params.userId) } : {},
                ],
            };
            const [posts, total] = yield this.prisma.$transaction([
                this.prisma.post.findMany({
                    skip: (page - 1) * size,
                    take: size,
                    where: where,
                    orderBy: {
                        createdAt: 'desc',
                    },
                    select: {
                        id: true,
                        text: true,
                        media: true,
                        createdAt: true,
                        updatedAt: true,
                        user: {
                            select: {
                                id: true,
                                name: true,
                                lastName: true,
                                avatar: true,
                            },
                        },
                        Like: {
                            select: {
                                userId: true,
                                isLike: true,
                            },
                        },
                        Comment: {
                            select: {
                                id: true,
                            },
                        },
                    },
                }),
                this.prisma.post.count({ where }),
            ]);
            const postsWithLikes = posts.map((_a) => {
                var { Like, Comment } = _a, post = __rest(_a, ["Like", "Comment"]);
                const totalLikes = Like.filter((like) => like.isLike).length;
                const totalDislikes = Like.filter((like) => !like.isLike).length;
                const totalComments = Comment.length;
                const userReaction = authUserId
                    ? Like.find((like) => like.userId === authUserId)
                    : null;
                return Object.assign(Object.assign({}, post), { totalLikes,
                    totalDislikes,
                    totalComments, userReaction: userReaction
                        ? userReaction.isLike
                            ? 'like'
                            : 'dislike'
                        : null });
            });
            const pagination = (0, pagination_1.paginate)(total, size, page);
            return {
                pagination,
                data: postsWithLikes,
            };
        });
    }
    findOne(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const _a = yield this.prisma.post.findUnique({
                where: { id },
                select: {
                    id: true,
                    text: true,
                    media: true,
                    createdAt: true,
                    updatedAt: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            lastName: true,
                            avatar: true,
                        },
                    },
                    Like: {
                        select: {
                            userId: true,
                            isLike: true,
                        },
                    },
                    Comment: {
                        select: {
                            id: true,
                        },
                    },
                },
            }), { Like, Comment } = _a, post = __rest(_a, ["Like", "Comment"]);
            const totalLikes = Like.filter((like) => like.isLike).length;
            const totalDislikes = Like.filter((like) => !like.isLike).length;
            const totalComments = Comment.length;
            const userReaction = userId
                ? Like.find((like) => like.userId === userId)
                : null;
            return Object.assign(Object.assign({}, post), { totalLikes,
                totalDislikes,
                totalComments, userReaction: userReaction
                    ? userReaction.isLike
                        ? 'like'
                        : 'dislike'
                    : null });
        });
    }
    findByUser(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page = 1, size = 10, search = '' } = params;
            const where = {
                AND: [
                    { text: { contains: search, mode: 'insensitive' } },
                    { userId: Number(params.userId) },
                ],
            };
            const [posts, total] = yield this.prisma.$transaction([
                this.prisma.post.findMany({
                    skip: (page - 1) * size,
                    take: size,
                    where: where,
                    orderBy: {
                        createdAt: 'desc',
                    },
                    select: {
                        id: true,
                        text: true,
                        media: true,
                        createdAt: true,
                        updatedAt: true,
                        user: {
                            select: {
                                id: true,
                                name: true,
                                lastName: true,
                                avatar: true,
                            },
                        },
                        Like: {
                            select: {
                                userId: true,
                                isLike: true,
                            },
                        },
                        Comment: {
                            select: {
                                id: true,
                            },
                        },
                    },
                }),
                this.prisma.post.count({ where }),
            ]);
            const postsWithLikes = posts.map((_a) => {
                var { Like, Comment } = _a, post = __rest(_a, ["Like", "Comment"]);
                const totalLikes = Like.filter((like) => like.isLike).length;
                const totalDislikes = Like.filter((like) => !like.isLike).length;
                const totalComments = Comment.length;
                const userReaction = params.userId
                    ? Like.find((like) => like.userId === params.userId)
                    : null;
                return Object.assign(Object.assign({}, post), { totalLikes,
                    totalDislikes,
                    totalComments, userReaction: userReaction
                        ? userReaction.isLike
                            ? 'like'
                            : 'dislike'
                        : null });
            });
            const pagination = (0, pagination_1.paginate)(total, size, page);
            return {
                pagination,
                data: postsWithLikes,
            };
        });
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PostsService);
//# sourceMappingURL=posts.service.js.map