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
var collectionFunctions = __importStar(require("../functions/collection"));
var routes = express_1["default"].Router();
routes.post("/create", function (req, res) {
    var data = req.body;
    if (!data.address) {
        return res.status(400).send("address parametr is required");
    }
    if (!data.name) {
        return res.status(400).send("name parametr is required");
    }
    if (!data.description) {
        return res.status(400).send("description parametr is required");
    }
    if (!data.owner) {
        return res.status(400).send("owner parametr is required");
    }
    if (!data.author) {
        return res.status(400).send("author parametr is required");
    }
    collectionFunctions.CreateCollection(data).then(function (doc) {
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
    if (!data.address) {
        return res.status(400).send("address parametr is required");
    }
    if (!data.name) {
        return res.status(400).send("name parametr is required");
    }
    if (!data.description) {
        return res.status(400).send("description parametr is required");
    }
    if (!data.owner) {
        return res.status(400).send("owner parametr is required");
    }
    if (!data.author) {
        return res.status(400).send("author parametr is required");
    }
    collectionFunctions.UpdateCollection(data).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(err.code ? err.code : 403).send(err);
    });
});
routes.post("/delete", function (req, res) {
    var data = req.body;
    if (!data._id) {
        return res.status(400).send("_id parametr is required");
    }
    if (!data.account) {
        return res.status(400).send("account parametr is required");
    }
    collectionFunctions.Delete(data._id, data.account).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(err.code ? err.code : 403).send(err);
    });
});
routes.get("/list", function (req, res) {
    var type = req.query.type;
    collectionFunctions.GetCollections(type).then(function (response) {
        return res.status(200).send(response);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.get("/get", function (req, res) {
    var address = req.query.address;
    if (!address) {
        return res.status(400).send("address parametr is required");
    }
    collectionFunctions.GetCollection(address).then(function (response) {
        return res.status(200).send(response);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.get("/my", function (req, res) {
    var address = req.query.address;
    if (!address) {
        return res.status(400).send("address parametr is required");
    }
    collectionFunctions.GetMyCollections(address).then(function (response) {
        return res.status(200).send(response);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.get("/collections", function (req, res) {
    var text = req.query.text;
    var from = req.query.from;
    collectionFunctions.Collections(text, from).then(function (response) {
        return res.status(200).send(response);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.get("/popular", function (req, res) {
    var text = req.query.text;
    var from = req.query.from;
    collectionFunctions.Popular(text, from).then(function (response) {
        return res.status(200).send(response);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
exports["default"] = routes;
//# sourceMappingURL=collections.js.map