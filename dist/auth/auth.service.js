"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    validateUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersService.findByEmail(email);
            if (user && (yield bcrypt.compare(password, user.password))) {
                return user;
            }
            return null;
        });
    }
    login(loginDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.validateUser(loginDto.email, loginDto.password);
            if (!user) {
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            const payload = { email: user.email, sub: user.id };
            const accessToken = this.jwtService.sign(payload);
            const refreshToken = this.jwtService.sign(payload, {
                secret: 'your_refresh_token_secret',
                expiresIn: '7d',
            });
            return {
                accessToken,
                refreshToken,
            };
        });
    }
    register(createUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcrypt.hash(createUserDto.password, 10);
            const user = yield this.usersService.createUser(Object.assign(Object.assign({}, createUserDto), { password: hashedPassword }));
            return this.login({ email: user.email, password: createUserDto.password });
        });
    }
    refreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { sub } = this.jwtService.verify(refreshToken, {
                    secret: 'your_refresh_token_secret',
                });
                const user = yield this.usersService.findOne(sub);
                if (!user) {
                    throw new common_1.UnauthorizedException('User not found');
                }
                const payload = { sub: user.id, email: user.email };
                const accessToken = this.jwtService.sign(payload);
                const newRefreshToken = this.jwtService.sign(payload, {
                    secret: 'your_refresh_token_secret',
                    expiresIn: '7d',
                });
                return { accessToken, refreshToken: newRefreshToken };
            }
            catch (error) {
                throw new common_1.UnauthorizedException('Invalid refresh token', error);
            }
        });
    }
    getProfile(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decoded = this.jwtService.verify(token);
                const user = yield this.usersService.findOne(decoded.sub);
                if (!user) {
                    throw new common_1.UnauthorizedException('User not found');
                }
                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    lastName: user.lastName,
                    avatar: user.avatar,
                };
            }
            catch (error) {
                throw new common_1.UnauthorizedException('Invalid token', error);
            }
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map