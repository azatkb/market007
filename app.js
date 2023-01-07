"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var mongoose_1 = __importDefault(require("mongoose"));
var users_1 = __importDefault(require("./routes/users"));
var collections_1 = __importDefault(require("./routes/collections"));
var transactions_1 = __importDefault(require("./routes/transactions"));
var contract_1 = __importDefault(require("./routes/contract"));
var nft_1 = __importDefault(require("./routes/nft"));
var secrets_1 = require("./util/secrets");
var path_1 = __importDefault(require("path"));
exports.app = express_1["default"]();
exports.app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
exports.app.set("port", secrets_1.PORT);
exports.app.use(body_parser_1["default"].json({ limit: "50mb" }));
exports.app.use(body_parser_1["default"].urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
exports.app.use(express_1["default"].static(path_1["default"].resolve('./') + "/public"));
mongoose_1["default"].connect(secrets_1.MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(function (err) {
    console.log("Site ready");
})["catch"](function (err) {
    console.log(err);
});
// Routes
exports.app.use("/users", users_1["default"]);
exports.app.use("/transactions", transactions_1["default"]);
exports.app.use("/collections", collections_1["default"]);
exports.app.use("/nft", nft_1["default"]);
exports.app.use("/contract", contract_1["default"]);
exports.app.use('/', function (req, res) {
    return res.status(200).send({ code: 200 });
});
//# sourceMappingURL=app.js.map