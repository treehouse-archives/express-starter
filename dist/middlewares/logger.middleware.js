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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.loggerMiddleware = exports.logEvents = void 0;
const date_fns_1 = require("date-fns");
const uuid_1 = require("uuid");
const fs = __importStar(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const promises_1 = __importDefault(require("fs/promises"));
const logsDirPath = node_path_1.default.join(__dirname, "..", "..", "logs");
const logEvents = (message, logFileName) => __awaiter(void 0, void 0, void 0, function* () {
    const dateTime = (0, date_fns_1.format)(new Date(), "yyyy/MM/dd\tHH:mm:ss");
    const logItem = `${dateTime}\t${(0, uuid_1.v4)()}\t${message}\n`;
    try {
        if (!fs.existsSync(logsDirPath))
            yield promises_1.default.mkdir(logsDirPath);
        yield promises_1.default.appendFile(node_path_1.default.join(logsDirPath, logFileName), logItem);
    }
    catch (err) {
        console.error(err);
    }
});
exports.logEvents = logEvents;
const loggerMiddleware = (request, response, next) => {
    (0, exports.logEvents)(`${request.method}\t${request.url}\t${request.headers.origin}`, "request.log");
    console.log(`${request.method} ${request.path}`);
    next();
};
exports.loggerMiddleware = loggerMiddleware;
exports.logger = exports.loggerMiddleware;
//# sourceMappingURL=logger.middleware.js.map