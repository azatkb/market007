"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.EMAIL_CONFIRM_URL = exports.SENDGRID_API_KEY = exports.JWTPRIVATKEY = exports.SOCKET_PORT = exports.PORT = exports.MONGODB_URI = exports.SESSION_SECRET = exports.ENVIRONMENT = void 0;
var logger_1 = __importDefault(require("./logger"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config({ path: ".env" });
exports.ENVIRONMENT = process.env.NODE_ENV;
var prod = exports.ENVIRONMENT === "production";
exports.SESSION_SECRET = process.env["SESSION_SECRET"];
exports.MONGODB_URI = process.env["MONGODB_URI"];
exports.PORT = process.env["PORT"];
exports.SOCKET_PORT = process.env["SOCKET_PORT"];
exports.JWTPRIVATKEY = process.env["JWTPRIVATKEY"];
exports.SENDGRID_API_KEY = process.env["SENDGRID_API_KEY"];
exports.EMAIL_CONFIRM_URL = process.env["EMAIL_CONFIRM_URL"];
if (!exports.MONGODB_URI) {
    logger_1["default"].error("No mongo connection string. Set MONGODB_URI_LOCAL environment variable.");
    process.exit(1);
}
//# sourceMappingURL=secrets.js.map