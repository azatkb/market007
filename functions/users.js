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
exports.GetProfile = exports.UpdateProfile = void 0;
var usersDb = __importStar(require("../database/users"));
exports.UpdateProfile = function (data) {
    return new Promise(function (resolve, reject) {
        usersDb.UpdateProfile(data).then(function () {
            resolve({ code: 200 });
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.GetProfile = function (address) {
    return new Promise(function (resolve, reject) {
        usersDb.GetProfile(address).then(function (user) {
            resolve(user);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
//# sourceMappingURL=users.js.map