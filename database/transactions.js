"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.GetVolume = exports.Getbalance = exports.GetTransactions = exports.CreateTransaction = void 0;
var Transaction_1 = __importDefault(require("../models/Transaction"));
exports.CreateTransaction = function (data) {
    return new Promise(function (resolve, reject) {
        new Transaction_1["default"](data)
            .save(function (err, saved) {
            if (!err) {
                resolve(saved);
            }
            else {
                reject({ code: 404 });
            }
        });
    });
};
exports.GetTransactions = function (address) {
    return new Promise(function (resolve, reject) {
        Transaction_1["default"].find({ $or: [{ to: address }, { from: address }] }, function (err, docs) {
            resolve(docs);
        });
    });
};
exports.Getbalance = function (address) {
    return new Promise(function (resolve, reject) {
        Transaction_1["default"].find({ $or: [{ to: address }, { from: address }] }, function (err, docs) {
            var total = 0;
            docs.forEach(function (d) {
                if (d.from === address) {
                    total -= d.eth;
                }
                else if (d.to === address) {
                    total += d.eth;
                }
            });
            resolve({ balance: total });
        });
    });
};
exports.GetVolume = function (address) {
    return new Promise(function (resolve, reject) {
        Transaction_1["default"].find({ contract: address, type: "buy nft" }, function (err, docs) {
            var total = 0;
            docs.forEach(function (d) {
                total += d.eth;
            });
            resolve({ volume: total });
        });
    });
};
//# sourceMappingURL=transactions.js.map