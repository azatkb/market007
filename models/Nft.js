"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var naftSchema = new mongoose_1["default"].Schema({
    id: String,
    address: String,
    owner: String,
    price: Number,
    data: Object,
    status: String
}, { timestamps: true });
var Nft = mongoose_1["default"].model("Nft", naftSchema);
exports["default"] = Nft;
//# sourceMappingURL=Nft.js.map