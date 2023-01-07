"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var contract_1 = require("../functions/contract");
var solc = require('solc');
var routes = express_1["default"].Router();
routes.post("/create", function (req, res) {
    var data = req.body;
    if (!data.name) {
        return res.status(400).send("name parametr is required");
    }
    if (!data.symbol) {
        return res.status(400).send("symbol parametr is required");
    }
    var source = contract_1.CreateContract("test", "Test");
    var input = {
        language: 'Solidity',
        sources: {
            'NFT.sol': {
                content: source
            }
        },
        settings: {
            outputSelection: {
                '*': {
                    '*': ['*']
                }
            }
        }
    };
    try {
        var tempFile = JSON.parse(solc.compile(JSON.stringify(input)));
        var contractFile = tempFile.contracts['NFT.sol']['NFT'];
        var bytecode = contractFile.evm.bytecode.object;
        var abi = contractFile.abi;
        return res.status(200).send({ bytecode: bytecode, abi: abi });
    }
    catch (err) {
        return res.status(500).send({ err: err });
    }
});
exports["default"] = routes;
//# sourceMappingURL=contract.js.map