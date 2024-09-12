"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiOkResponsePaginated = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const pagination_respoonse_dto_1 = require("./pagination-respoonse.dto");
const ApiOkResponsePaginated = (dataDto) => (0, common_1.applyDecorators)((0, swagger_1.ApiExtraModels)(pagination_respoonse_dto_1.PaginationResponseDto, dataDto), (0, swagger_1.ApiOkResponse)({
    schema: {
        allOf: [
            { $ref: (0, swagger_1.getSchemaPath)(pagination_respoonse_dto_1.PaginationResponseDto) },
            {
                properties: {
                    data: {
                        type: 'array',
                        items: { $ref: (0, swagger_1.getSchemaPath)(dataDto) },
                    },
                },
            },
        ],
    },
}));
exports.ApiOkResponsePaginated = ApiOkResponsePaginated;
//# sourceMappingURL=ApiOkResponsePaginated.js.map