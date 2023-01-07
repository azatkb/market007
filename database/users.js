"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.GetProfile = exports.UpdateProfile = void 0;
var User_1 = __importDefault(require("../models/User"));
exports.UpdateProfile = function (data) {
    return new Promise(function (resolve, reject) {
        User_1["default"].updateOne({ address: data.address }, { $set: {
                email: data.email,
                name: data.name,
                address: data.address
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
exports.GetProfile = function (address) {
    return new Promise(function (resolve, reject) {
        var usersProjection = {
            __v: false,
            updatedAt: false,
            createdAt: false
        };
        User_1["default"].findOne({ address: address }, usersProjection, function (err, doc) {
            if (doc) {
                resolve(doc);
            }
            else {
                reject({ code: 404, msg: "not found" });
            }
        });
    });
};
//# sourceMappingURL=users.js.map