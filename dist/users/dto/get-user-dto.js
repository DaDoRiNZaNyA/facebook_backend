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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class GetUserDto {
}
exports.GetUserDto = GetUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID ',
        example: 1,
    }),
    __metadata("design:type", Number)
], GetUserDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'test@example.com',
        description: 'Email пользователя',
    }),
    __metadata("design:type", String)
], GetUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'password123', description: 'Пароль пользователя' }),
    __metadata("design:type", String)
], GetUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'John Doe',
        description: 'Имя пользователя',
        required: false,
    }),
    __metadata("design:type", String)
], GetUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '/uploads/avatars/avatar-1726031224516-565290115.jpeg',
        description: 'avatar',
        required: false,
    }),
    __metadata("design:type", String)
], GetUserDto.prototype, "avatar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Creation date',
        example: '2024-09-03T05:17:30.367Z',
    }),
    __metadata("design:type", String)
], GetUserDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Last update date',
        example: '2024-09-03T05:17:30.367Z',
    }),
    __metadata("design:type", String)
], GetUserDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Is user followed',
        example: false,
    }),
    __metadata("design:type", Boolean)
], GetUserDto.prototype, "isFollowed", void 0);
//# sourceMappingURL=get-user-dto.js.map