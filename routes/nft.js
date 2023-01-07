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
var nftFunctions = __importStar(require("../functions/nft"));
var routes = express_1["default"].Router();
routes.post("/create", function (req, res) {
    var data = req.body;
    if (!data.address) {
        return res.status(400).send("address parametr is required");
    }
    if (!data.id) {
        return res.status(400).send("id parametr is required");
    }
    if (!data.owner) {
        return res.status(400).send("owner parametr is required");
    }
    if (!data.price) {
        return res.status(400).send("price parametr is required");
    }
    if (!data.data) {
        return res.status(400).send("data parametr is required");
    }
    if (!data.status) {
        return res.status(400).send("status parametr is required");
    }
    nftFunctions.CreateNft(data).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(err.code ? err.code : 403).send(err);
    });
});
routes.post("/update", function (req, res) {
    var data = req.body;
    if (!data._id) {
        return res.status(400).send("_id parametr is required");
    }
    if (!data.price) {
        return res.status(400).send("price parametr is required");
    }
    if (!data.status) {
        return res.status(400).send("status parametr is required");
    }
    nftFunctions.UpdateNft(data).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(err.code ? err.code : 403).send(err);
    });
});
routes.post("/buy", function (req, res) {
    var data = req.body;
    if (!data.id) {
        return res.status(400).send("id parametr is required");
    }
    if (!data.address) {
        return res.status(400).send("address parametr is required");
    }
    if (!data.eth) {
        return res.status(400).send("eth parametr is required");
    }
    if (!data.crypto) {
        return res.status(400).send("crypto parametr is required");
    }
    if (!data.from) {
        return res.status(400).send("from parametr is required");
    }
    if (!data.to) {
        return res.status(400).send("to parametr is required");
    }
    nftFunctions.BuyNft(data).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(err.code ? err.code : 403).send(err);
    });
});
routes.post("/withdraw", function (req, res) {
    var data = req.body;
    if (!data._id) {
        return res.status(400).send("_id parametr is required");
    }
    if (!data.account) {
        return res.status(400).send("address parametr is required");
    }
    nftFunctions.Withdraw(data).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(err.code ? err.code : 403).send(err);
    });
});
routes.get("/collection", function (req, res) {
    var address = req.query.address;
    var limit = req.query.limit ? parseInt(req.query.limit) : 5;
    nftFunctions.GetNftCollection(address, limit).then(function (response) {
        return res.status(200).send(response);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.get("/get", function (req, res) {
    var _id = req.query.id;
    if (!_id) {
        return res.status(400).send("id parametr is required");
    }
    nftFunctions.GetNft(_id).then(function (response) {
        return res.status(200).send(response);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.get("/get-my", function (req, res) {
    var address = req.query.address;
    if (!address) {
        return res.status(400).send("id parametr is required");
    }
    nftFunctions.GetMy(address).then(function (response) {
        return res.status(200).send(response);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
exports["default"] = routes;
//# sourceMappingURL=nft.js.map