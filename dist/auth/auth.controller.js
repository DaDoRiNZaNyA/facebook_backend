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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const login_dto_1 = require("./dto/login.dto");
const refresh_token_sto_1 = require("./dto/refresh-token.sto");
const passport_1 = require("@nestjs/passport");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const update_user_dto_1 = require("./dto/update-user,dto");
let AuthController = class AuthController {
    constructor(authService, userService, jwtService) {
        this.authService = authService;
        this.userService = userService;
        this.jwtService = jwtService;
    }
    register(createUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authService.register(createUserDto);
        });
    }
    login(loginDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authService.login(loginDto);
        });
    }
    refresh(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { accessToken, refreshToken } = yield this.authService.refreshToken(body.refreshToken);
            return { accessToken, refreshToken };
        });
    }
    getProfile(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization.split(' ')[1];
            return this.authService.getProfile(token);
        });
    }
    updateProfile(req, updateUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = this.jwtService.verify(token);
            const user = yield this.userService.findOne(decoded.sub);
            if (!user) {
                throw new common_1.UnauthorizedException('User not found');
            }
            return this.userService.updateUser({
                id: user.id,
                name: updateUserDto.name,
                lastName: updateUserDto.lastName,
                email: updateUserDto.email,
            });
        });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'User registered successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User logged in successfully.',
        schema: {
            example: {
                accessToken: 'your-access-token',
                refreshToken: 'your-refresh-token',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('refresh'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Access token successfully refreshed.',
        schema: {
            example: {
                accessToken: 'your-new-access-token',
                refreshToken: 'your-new-refresh-token',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized. Invalid refresh token.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_token_sto_1.RefreshTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.Get)('getProfile'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Get my profile',
        schema: {
            example: {
                id: 1,
                email: 'pJn9Z@example.com',
                name: 'John',
                lastName: 'Doe',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized. Invalid refresh token.',
    }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Put)('updateProfile'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Update my profile',
        schema: {
            example: {
                email: 'pJn9Z@example.com',
                name: 'John',
                lastName: 'Doe',
                avatar: '/uploads/avatars/avatar-1726031224516-565290115.jpeg',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized. Invalid refresh token.',
    }),
    (0, swagger_1.ApiBody)({
        type: update_user_dto_1.UpdateUserDto,
    }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateProfile", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService,
        jwt_1.JwtService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map