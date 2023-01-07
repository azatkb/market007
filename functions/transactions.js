"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.GetVolume = exports.GetBalance = exports.GetTransactions = exports.CreateTransaction = void 0;
var transactionsDb = __importStar(require("../database/transactions"));
exports.CreateTransaction = function (data) {
    return new Promise(function (resolve, reject) {
        transactionsDb.CreateTransaction(data).then(function (saved) {
            resolve(saved);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.GetTransactions = function (address) {
    return new Promise(function (resolve, reject) {
        transactionsDb.GetTransactions(address).then(function (saved) {
            resolve(saved);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.GetBalance = function (address) {
    return new Promise(function (resolve, reject) {
        transactionsDb.Getbalance(address).then(function (saved) {
            resolve(saved);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.GetVolume = function (address) {
    return new Promise(function (resolve, reject) {
        transactionsDb.GetVolume(address).then(function (saved) {
            resolve(saved);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
//# sourceMappingURL=transactions.js.map