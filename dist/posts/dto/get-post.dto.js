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
exports.GetPostDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'user ID',
        example: 1,
    }),
    __metadata("design:type", Number)
], UserDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the user',
        example: 'John123',
    }),
    __metadata("design:type", String)
], UserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Last name of the user',
        example: 'Doe',
    }),
    __metadata("design:type", String)
], UserDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '/uploads/avatars/avatar-1726031224516-565290115.jpeg',
        description: 'avatar',
        required: false,
    }),
    __metadata("design:type", String)
], UserDto.prototype, "avatar", void 0);
class GetPostDto {
}
exports.GetPostDto = GetPostDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the post',
        example: 1,
    }),
    __metadata("design:type", Number)
], GetPostDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User who created the post',
        type: UserDto,
    }),
    __metadata("design:type", UserDto)
], GetPostDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Text content of the post',
        example: 'Sample text',
    }),
    __metadata("design:type", String)
], GetPostDto.prototype, "text", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Media URL or path',
        example: [
            {
                id: 4,
                postId: 20,
                url: '/uploads/posts/post-1726036969254-227617590.jpeg',
                type: 'image/jpeg',
                createdAt: '2024-09-11T06:42:49.258Z',
            },
        ],
        nullable: true,
    }),
    __metadata("design:type", Array)
], GetPostDto.prototype, "media", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Creation date of the post',
        example: '2024-09-03T05:17:30.367Z',
    }),
    __metadata("design:type", String)
], GetPostDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Last update date of the post',
        example: '2024-09-03T05:17:30.367Z',
    }),
    __metadata("design:type", String)
], GetPostDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'totalLikes',
        example: 1,
    }),
    __metadata("design:type", Number)
], GetPostDto.prototype, "totalLikes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'totalDislikes',
        example: 1,
    }),
    __metadata("design:type", Number)
], GetPostDto.prototype, "totalDislikes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'totalComments',
        example: 1,
    }),
    __metadata("design:type", Number)
], GetPostDto.prototype, "totalComments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'userReaction',
        example: 'like',
    }),
    __metadata("design:type", String)
], GetPostDto.prototype, "userReaction", void 0);
//# sourceMappingURL=get-post.dto.js.map