"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger_middleware_1 = require("@/middlewares/logger.middleware");
const errorHandlerMiddleware = (error, request, response) => {
    (0, logger_middleware_1.logEvents)(`${error.name}: ${error.message}\t${request.method}\t${request.url}\t${request.headers.origin}`, "error.log");
    response.status(request.statusCode || 500);
    response.json({ message: error.message, isError: true });
};
exports.errorHandler = errorHandlerMiddleware;
//# sourceMappingURL=error-handler.middleware.js.map