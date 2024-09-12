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
exports.PaginationResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class PaginationResponseDto {
}
exports.PaginationResponseDto = PaginationResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'object',
        properties: {
            total: { type: 'number', description: 'Total number of users' },
            totalPages: { type: 'number', description: 'Total number of pages' },
            currentPage: { type: 'number', description: 'Current page number' },
            pageSize: { type: 'number', description: 'Number of users per page' },
        },
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], PaginationResponseDto.prototype, "pagination", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'data',
        type: 'array',
        items: { type: 'object' },
    }),
    __metadata("design:type", Array)
], PaginationResponseDto.prototype, "data", void 0);
//# sourceMappingURL=pagination-respoonse.dto.js.map