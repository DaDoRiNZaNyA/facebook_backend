"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = paginate;
function paginate(total, size, page) {
    const totalPages = Math.ceil(total / size);
    return {
        total,
        totalPages,
        currentPage: page,
        pageSize: size,
    };
}
//# sourceMappingURL=pagination.js.map