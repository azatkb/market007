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
var express_1 = __importDefault(require("express"));
var transactionsFunctions = __importStar(require("../functions/transactions"));
var routes = express_1["default"].Router();
routes.post("/create", function (req, res) {
    var data = req.body;
    if (!data.type) {
        return res.status(400).send("type parametr is required");
    }
    if (!data.status) {
        return res.status(400).send("status parametr is required");
    }
    if (!data.eth) {
        return res.status(400).send("eth parametr is required");
    }
    if (!data.crypto) {
        return res.status(400).send("crypto parametr is required");
    }
    transactionsFunctions.CreateTransaction(data).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(err.code ? err.code : 403).send(err);
    });
});
routes.get("/list", function (req, res) {
    var address = req.query.address;
    if (!address) {
        return res.status(400).send("address parametr is required");
    }
    transactionsFunctions.GetTransactions(address).then(function (response) {
        return res.status(200).send(response);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.get("/balance", function (req, res) {
    var address = req.query.address;
    if (!address) {
        return res.status(400).send("address parametr is required");
    }
    transactionsFunctions.GetBalance(address).then(function (response) {
        return res.status(200).send(response);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.get("/volume", function (req, res) {
    var address = req.query.address;
    if (!address) {
        return res.status(400).send("address parametr is required");
    }
    transactionsFunctions.GetVolume(address).then(function (response) {
        return res.status(200).send(response);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
exports["default"] = routes;
//# sourceMappingURL=transactions.js.map