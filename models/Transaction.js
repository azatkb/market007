"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var transactionSchema = new mongoose_1["default"].Schema({
    type: String,
    status: String,
    eth: Number,
    crypto: String,
    from: String,
    to: String,
    contract: String
}, { timestamps: true });
var Transaction = mongoose_1["default"].model("Transaction", transactionSchema);
exports["default"] = Transaction;
//# sourceMappingURL=Transaction.js.map