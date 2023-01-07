"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.isAdmin = exports.isAuthenticated = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var secrets_1 = require("../util/secrets");
exports.isAuthenticated = function (req, res, next) {
    try {
        var token = req.headers.authorization;
        var decodedToken = jsonwebtoken_1["default"].verify(token, secrets_1.JWTPRIVATKEY);
        req.token = decodedToken;
        next();
    }
    catch (_a) {
        res.status(403).json({
            error: "Invalid request!"
        });
    }
};
exports.isAdmin = function (req, res, next) {
    try {
        var token = req.headers.authorization;
        var decodedToken = jsonwebtoken_1["default"].verify(token, secrets_1.JWTPRIVATKEY);
        if (decodedToken.role && decodedToken.role === "admin") {
            req.token = decodedToken;
            next();
        }
        else {
            res.status(403).json({
                error: "Permission denied!"
            });
        }
    }
    catch (_a) {
        res.status(403).json({
            error: "Invalid request!"
        });
    }
};
exports["default"] = exports.isAuthenticated;
//# sourceMappingURL=auth.js.map