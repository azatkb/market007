"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var userSchema = new mongoose_1["default"].Schema({
    email: String,
    name: String,
    address: String
}, { timestamps: true });
var User = mongoose_1["default"].model("User", userSchema);
exports["default"] = User;
//# sourceMappingURL=User.js.map