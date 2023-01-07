"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var collectionSchema = new mongoose_1["default"].Schema({
    address: String,
    owner: String,
    author: String,
    name: String,
    description: String,
    logo: String,
    type: String,
    totalSupply: String
}, { timestamps: true });
var Collection = mongoose_1["default"].model("Collection", collectionSchema);
exports["default"] = Collection;
//# sourceMappingURL=Collection.js.map