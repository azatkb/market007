"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Popular = exports.Collections = exports.GetCollections = exports.GetMyCollections = exports.GetCollection = exports.UpdateCollection = exports.Delete = exports.CreateCollection = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Collection_1 = __importDefault(require("../models/Collection"));
var Nft_1 = __importDefault(require("../models/Nft"));
var Transaction_1 = __importDefault(require("../models/Transaction"));
exports.CreateCollection = function (data) {
    return new Promise(function (resolve, reject) {
        new Collection_1["default"](data).save().then(function (saved) {
            resolve(saved);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.Delete = function (_id, account) {
    return new Promise(function (resolve, reject) {
        Collection_1["default"].deleteOne({ _id: new mongoose_1["default"].Types.ObjectId(_id), owner: account }, function (err) {
            if (!err) {
                resolve({ code: 200 });
            }
            else {
                reject({ code: 404, msg: "not found" });
            }
        });
    });
};
exports.UpdateCollection = function (data) {
    return new Promise(function (resolve, reject) {
        Collection_1["default"].updateOne({ _id: new mongoose_1["default"].Types.ObjectId(data._id) }, { $set: {
                address: data.address,
                owner: data.owner,
                name: data.name,
                description: data.description,
                logo: data.logo,
                author: data.author,
                type: data.type,
                totalSupply: data.totalSupply
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
exports.GetCollection = function (address) {
    return new Promise(function (resolve, reject) {
        var usersProjection = {
            __v: false,
            updatedAt: false
        };
        Collection_1["default"].findOne({ address: address }, usersProjection, function (err, doc) {
            if (doc) {
                resolve(doc);
            }
            else {
                reject({ code: 404, msg: "not found" });
            }
        });
    });
};
exports.GetMyCollections = function (address) {
    return new Promise(function (resolve, reject) {
        var usersProjection = {
            __v: false,
            updatedAt: false
        };
        Collection_1["default"].find({ owner: address }, usersProjection, function (err, docs) {
            if (docs) {
                resolve(docs);
            }
            else {
                reject({ code: 404, msg: "not found" });
            }
        });
    });
};
exports.GetCollections = function (type) {
    return new Promise(function (resolve, reject) {
        var usersProjection = {
            __v: false,
            updatedAt: false
        };
        var filter = type ? { type: type } : {};
        Collection_1["default"].find(filter, usersProjection, function (err, docs) {
            if (docs.length) {
                var addresses_1 = [];
                docs.forEach(function (collection) {
                    addresses_1.push(collection.address);
                });
                Nft_1["default"].find({ address: { "$in": addresses_1 } })
                    .exec(function (err, nfts) {
                    var result = [];
                    docs.forEach(function (doc) {
                        var collection = doc.toObject();
                        var nft = nfts.filter(function (n) { return n.address == doc.address; });
                        if (nft.length) {
                            collection.nft = nft[0];
                            result.push(collection);
                        }
                    });
                    resolve(result);
                });
            }
            else {
                reject({ code: 404, msg: "not found" });
            }
        });
    });
};
exports.Collections = function (text, from) {
    return new Promise(function (resolve, reject) {
        var date = new Date(from);
        var filter = text ? {
            "$or": [{ name: { "$regex": text } }, { author: { "$regex": text } }],
            "createdAt": { $gte: date }
        } : { "createdAt": { $gte: date } };
        var month = new Date();
        month.setMonth(month.getMonth() - 1);
        month.setHours(0, 0, 0, 0);
        var month2 = new Date();
        month2.setMonth(month.getMonth() - 2);
        month2.setHours(0, 0, 0, 0);
        var prices = {};
        var volume = {};
        var volume30 = {};
        var volume60 = {};
        var owners = {};
        var sales = {};
        Collection_1["default"].find(filter)
            .exec(function (err, collesctions) {
            if (!err) {
                var addresses_2 = [];
                collesctions.forEach(function (collection) {
                    addresses_2.push(collection.address);
                    prices[collection.address] = 0;
                    volume[collection.address] = 0;
                    volume30[collection.address] = 0;
                    volume60[collection.address] = 0;
                    sales[collection.address] = 0;
                    owners[collection.address] = new Set();
                });
                Nft_1["default"].find({ address: { "$in": addresses_2 } })
                    .exec(function (err, nfts) {
                    if (!err) {
                        nfts.forEach(function (nft) {
                            prices[nft.address] += nft.price;
                            owners[nft.address].add(nft.owner);
                        });
                        Transaction_1["default"].find({ contract: { "$in": addresses_2 } })
                            .exec(function (err, transactions) {
                            if (!err) {
                                transactions.forEach(function (trans) {
                                    var date = new Date(trans.createdAt);
                                    volume[trans.contract] += trans.eth;
                                    if (date > month) {
                                        volume30[trans.contract] += trans.eth;
                                    }
                                    else if (date < month && date > month2) {
                                        volume60[trans.contract] += trans.eth;
                                    }
                                    if (trans.type === "buy nft") {
                                        sales[trans.contract]++;
                                    }
                                });
                                var result_1 = [];
                                collesctions.forEach(function (coll) {
                                    var collection = coll.toObject();
                                    collection.price = prices[collection.address];
                                    collection.volume = volume[collection.address];
                                    var vol30 = volume30[collection.address];
                                    var vol60 = volume60[collection.address];
                                    collection.volume30 = vol30;
                                    collection.owners = owners[collection.address].size;
                                    collection.sales = sales[collection.address];
                                    var differens = 100 * Math.abs((vol30 - vol60) / ((vol30 + vol60) / 2));
                                    if (differens) {
                                        collection.diff = vol30 > vol60 ? '+ ' + differens : '- ' + differens;
                                    }
                                    else {
                                        collection.diff = '0%';
                                    }
                                    result_1.push(collection);
                                });
                                resolve(result_1);
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
                reject(err);
            }
        });
    });
};
exports.Popular = function (text, from) {
    return new Promise(function (resolve, reject) {
        var date = new Date(from);
        var filter = text ? {
            "$or": [{ name: { "$regex": text } }, { author: { "$regex": text } }],
            "createdAt": { $gte: date }
        } : { "createdAt": { $gte: date } };
        var collectionsMap = {};
        Collection_1["default"].find(filter)
            .exec(function (err, collesctions) {
            if (!err) {
                var addresses_3 = [];
                collesctions.forEach(function (collection) {
                    addresses_3.push(collection.address);
                    collectionsMap[collection.address] = collection.name;
                });
                Nft_1["default"].find({ address: { "$in": addresses_3 } })
                    .exec(function (err, nfts) {
                    if (!err) {
                        var result_2 = [];
                        nfts.forEach(function (nft) {
                            var nftObj = nft.toObject();
                            nftObj.collection = collectionsMap[nftObj.address];
                            result_2.push(nftObj);
                        });
                        resolve(result_2);
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
    });
};
//# sourceMappingURL=collection.js.map