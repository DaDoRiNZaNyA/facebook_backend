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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const pagination_1 = require("../utils/pagination");
const path_1 = require("path");
const fs_1 = require("fs");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.user.create({
                data,
            });
        });
    }
    findAll(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page = 1, size = 10, search = '' } = params;
            const where = {
                AND: [
                    {
                        OR: [
                            { name: { contains: search, mode: 'insensitive' } },
                            { lastName: { contains: search, mode: 'insensitive' } },
                            { email: { contains: search, mode: 'insensitive' } },
                        ],
                    },
                    { id: { not: params.userId } },
                ],
            };
            const [users, total] = yield this.prisma.$transaction([
                this.prisma.user.findMany({
                    skip: (page - 1) * size,
                    take: size,
                    where: where,
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        lastName: true,
                        avatar: true,
                        followers: {
                            select: {
                                followerId: true,
                            },
                        },
                    },
                }),
                this.prisma.user.count({ where }),
            ]);
            const usersWithFollowStatus = users.map((_a) => {
                var { followers } = _a, user = __rest(_a, ["followers"]);
                return (Object.assign(Object.assign({}, user), { isFollowed: followers.some((follower) => follower.followerId === params.userId) }));
            });
            const pagination = (0, pagination_1.paginate)(total, size, page);
            return {
                pagination,
                data: usersWithFollowStatus,
            };
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.user.findUnique({
                where: { id },
            });
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.user.delete({
                where: { id },
            });
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.user.findUnique({ where: { email } });
        });
    }
    updateUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, name, lastName, email, }) {
            return this.prisma.user.update({
                where: { id },
                data: { name, lastName, email },
            });
        });
    }
    updateAvatar(userId, avatarPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.user.findUnique({
                where: { id: userId },
            });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            if (user.avatar) {
                const oldAvatarPath = (0, path_1.join)(__dirname, '../../uploads/avatars', user.avatar);
                try {
                    (0, fs_1.unlinkSync)(oldAvatarPath);
                }
                catch (err) {
                    console.error(`Failed to delete old avatar at ${oldAvatarPath}:`, err);
                }
            }
            return this.prisma.user.update({
                where: { id: userId },
                data: { avatar: avatarPath },
            });
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map