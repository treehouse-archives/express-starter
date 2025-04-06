"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const allowedOrigins = ((_a = process.env.ALLOWED_ORIGINS) === null || _a === void 0 ? void 0 : _a.split(",")) || [];
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin)
            callback(null, true);
        else
            callback(new Error("Not allowed by CORS."));
    },
    credentials: true,
    optionsSuccessStatus: 200,
};
exports.default = corsOptions;
//# sourceMappingURL=cors-options.js.map