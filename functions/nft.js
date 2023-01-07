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
exports.Withdraw = exports.GetMy = exports.BuyNft = exports.GetNftCollection = exports.GetNft = exports.UpdateNft = exports.CreateNft = void 0;
var nftDb = __importStar(require("../database/nft"));
exports.CreateNft = function (data) {
    return new Promise(function (resolve, reject) {
        nftDb.CreateNft(data).then(function (saved) {
            resolve(saved);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.UpdateNft = function (data) {
    return new Promise(function (resolve, reject) {
        nftDb.UpdateNft(data).then(function (saved) {
            resolve(saved);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.GetNft = function (_id) {
    return new Promise(function (resolve, reject) {
        nftDb.GetNft(_id).then(function (saved) {
            resolve(saved);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.GetNftCollection = function (address, limit) {
    return new Promise(function (resolve, reject) {
        nftDb.GetNftCollection(address, limit).then(function (saved) {
            resolve(saved);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.BuyNft = function (data) {
    return new Promise(function (resolve, reject) {
        nftDb.BuyNft(data).then(function (saved) {
            resolve(saved);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.GetMy = function (address) {
    return new Promise(function (resolve, reject) {
        nftDb.GetMy(address).then(function (saved) {
            resolve(saved);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.Withdraw = function (data) {
    return new Promise(function (resolve, reject) {
        nftDb.Withdraw(data).then(function (saved) {
            resolve(saved);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
//# sourceMappingURL=nft.js.map