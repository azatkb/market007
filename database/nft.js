"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.GetMy = exports.BuyNft = exports.GetNftCollection = exports.GetNft = exports.Withdraw = exports.UpdateNft = exports.CreateNft = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Nft_1 = __importDefault(require("../models/Nft"));
var Transaction_1 = __importDefault(require("../models/Transaction"));
var Collection_1 = __importDefault(require("../models/Collection"));
exports.CreateNft = function (data) {
    return new Promise(function (resolve, reject) {
        Collection_1["default"].find({ address: data.address }, function (err, docs) {
            if (docs.length == 0) {
                new Collection_1["default"]({ name: data.name, address: data.address }).save().then(function (saved) {
                    new Nft_1["default"](data).save().then(function (saved) {
                        resolve(saved);
                    })["catch"](function (err) {
                        reject(err);
                    });
                })["catch"](function (err) {
                    reject(err);
                });
            }
            else {
                new Nft_1["default"](data).save().then(function (saved) {
                    resolve(saved);
                })["catch"](function (err) {
                    reject(err);
                });
            }
        });
    });
};
exports.UpdateNft = function (data) {
    return new Promise(function (resolve, reject) {
        Nft_1["default"].updateOne({ _id: new mongoose_1["default"].Types.ObjectId(data._id), owner: data.account }, { $set: {
                price: data.price,
                status: data.status
            } }, { upsert: true }, function (err, user) {
            if (!err) {
                resolve(user);
            }
            else {
                reject({ code: 404, msg: "not found" });
            }
        });
    });
};
exports.Withdraw = function (data) {
    return new Promise(function (resolve, reject) {
        Nft_1["default"].deleteOne({ _id: new mongoose_1["default"].Types.ObjectId(data._id), owner: data.account }, function (err) {
            if (!err) {
                resolve({ code: 200 });
            }
            else {
                reject({ code: 404, msg: "not found" });
            }
        });
    });
};
exports.GetNft = function (_id) {
    return new Promise(function (resolve, reject) {
        var usersProjection = {
            __v: false,
            updatedAt: false
        };
        Nft_1["default"].findOne({ _id: new mongoose_1["default"].Types.ObjectId(_id) }, usersProjection, function (err, doc) {
            if (doc) {
                resolve(doc);
            }
            else {
                reject({ code: 404, msg: "not found" });
            }
        });
    });
};
exports.GetNftCollection = function (address, limit) {
    return new Promise(function (resolve, reject) {
        var usersProjection = {
            __v: false,
            updatedAt: false
        };
        Nft_1["default"].find({ address: address })
            .limit(limit)
            .exec(function (err, doc) {
            if (doc) {
                resolve(doc);
            }
            else {
                reject({ code: 404, msg: "not found" });
            }
        });
    });
};
exports.BuyNft = function (data) {
    return new Promise(function (resolve, reject) {
        Nft_1["default"].updateOne({ id: data.id, address: data.address }, { $set: {
                owner: data.from,
                status: 'delisted'
            } }, function (err, user) {
            if (!err) {
                new Transaction_1["default"]({
                    type: "buy nft",
                    status: "completed",
                    eth: data.eth,
                    crypto: data.crypto,
                    from: data.from,
                    to: data.to,
                    contract: data.address
                }).save(function (err, saved) {
                    if (!err) {
                        new Transaction_1["default"]({
                            type: "deposit",
                            status: "completed",
                            eth: data.eth,
                            crypto: "eth",
                            to: data.from
                        }).save(function (err, saved) {
                            if (!err) {
                                resolve(saved);
                            }
                            else {
                                reject(err);
                            }
                        });
                    }
                    else {
                        reject(err);
                    }
                });
            }
            else {
                reject({ code: 404, msg: "not found" });
            }
        });
    });
};
exports.GetMy = function (address) {
    return new Promise(function (resolve, reject) {
        Nft_1["default"].find({ owner: address })
            .exec(function (err, doc) {
            if (doc) {
                resolve(doc);
            }
            else {
                reject({ code: 404, msg: "not found" });
            }
        });
    });
};
//# sourceMappingURL=nft.js.map