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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Delete = exports.Popular = exports.Collections = exports.GetCollections = exports.GetMyCollections = exports.GetCollection = exports.UpdateCollection = exports.CreateCollection = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var collectionsDb = __importStar(require("../database/collection"));
var image_1 = require("../util/image");
exports.CreateCollection = function (data) {
    return new Promise(function (resolve, reject) {
        if (data.logo) {
            image_1.saveImage(data.logo, "collections", new mongoose_1["default"].Types.ObjectId()).then(function (path) {
                data.logo = path;
                collectionsDb.CreateCollection(data).then(function (saved) {
                    resolve(saved);
                })["catch"](function (err) {
                    reject(err);
                });
            });
        }
        else {
            collectionsDb.CreateCollection(data).then(function (saved) {
                resolve(saved);
            })["catch"](function (err) {
                reject(err);
            });
        }
    });
};
exports.UpdateCollection = function (data) {
    return new Promise(function (resolve, reject) {
        if (data.logo.indexOf("base64") > (-1)) {
            image_1.saveImage(data.logo, "collections", new mongoose_1["default"].Types.ObjectId()).then(function (path) {
                data.logo = path;
                collectionsDb.UpdateCollection(data).then(function (saved) {
                    resolve(saved);
                })["catch"](function (err) {
                    reject(err);
                });
            });
        }
        else {
            collectionsDb.UpdateCollection(data).then(function (saved) {
                resolve(saved);
            })["catch"](function (err) {
                reject(err);
            });
        }
    });
};
exports.GetCollection = function (address) {
    return new Promise(function (resolve, reject) {
        collectionsDb.GetCollection(address).then(function (saved) {
            resolve(saved);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.GetMyCollections = function (address) {
    return new Promise(function (resolve, reject) {
        collectionsDb.GetMyCollections(address).then(function (saved) {
            resolve(saved);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.GetCollections = function (type) {
    return new Promise(function (resolve, reject) {
        collectionsDb.GetCollections(type).then(function (saved) {
            resolve(saved);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.Collections = function (text, from) {
    return new Promise(function (resolve, reject) {
        collectionsDb.Collections(text, from).then(function (saved) {
            resolve(saved);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.Popular = function (text, from) {
    return new Promise(function (resolve, reject) {
        collectionsDb.Popular(text, from).then(function (saved) {
            resolve(saved);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.Delete = function (_id, account) {
    return new Promise(function (resolve, reject) {
        collectionsDb.Delete(_id, account).then(function (saved) {
            resolve(saved);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
//# sourceMappingURL=collection.js.map