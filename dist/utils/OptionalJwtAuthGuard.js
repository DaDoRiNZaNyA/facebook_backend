"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionalJwtAuthGuard = void 0;
const passport_1 = require("@nestjs/passport");
class OptionalJwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    handleRequest(err, user) {
        return user;
    }
}
exports.OptionalJwtAuthGuard = OptionalJwtAuthGuard;
//# sourceMappingURL=OptionalJwtAuthGuard.js.map