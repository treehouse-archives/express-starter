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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_options_1 = __importDefault(require("@/config/cors-options"));
const connect_db_1 = __importDefault(require("@/config/connect-db"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const error_handler_middleware_1 = require("./middlewares/error-handler.middleware");
const logger_middleware_js_1 = require("./middlewares/logger.middleware.js");
const node_path_1 = __importDefault(require("node:path"));
// connect to MongoDB
(0, connect_db_1.default)();
app.use(logger_middleware_js_1.logger);
app.use((0, cors_1.default)(cors_options_1.default));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
// views & static files
app.set("view engine", "pug");
app.set("views", node_path_1.default.join(__dirname, "views"));
app.use("/", express_1.default.static(node_path_1.default.join(__dirname, "public")));
// routes
// app.use("/", );
// catch 404 and forward to error handler
app.all("*", (request, response) => {
    response.status(404);
    if (request.accepts("html")) {
        return response.render("404");
    }
    else if (request.accepts("json")) {
        response.json({ message: "Resource not found" });
        return;
    }
    else {
        response.type("text").send("Resource not found. Please check the URL.");
        return;
    }
});
// pass any unhandled errors to the error handler
app.use(error_handler_middleware_1.errorHandler);
// connect to mongoDB
mongoose_1.default.connection.once("open", () => {
    console.log("Connected to MongoDB.");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));
});
// if any connection error occurs
mongoose_1.default.connection.on("error", (err) => {
    console.error(err.message);
    (0, logger_middleware_js_1.logEvents)(err.message, "mongo-error.log");
});
//# sourceMappingURL=app.js.map