import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import usersRoutes  from "./routes/users"; 
import collectionsRoutes  from "./routes/collections"; 
import transactionsRoutes  from "./routes/transactions";
import contractRoutes  from "./routes/contract";
import nftRoutes  from "./routes/nft";
import { MONGODB_URI, PORT } from "./util/secrets";
import path from "path";
export const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.set("port", PORT);
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(express.static(path.resolve('./') +"/public"));

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true } ).then(err => {
    console.log("Site ready");
}).catch((err)=>{
    console.log(err)
});

// Routes

app.use("/users", usersRoutes);
app.use("/transactions", transactionsRoutes);
app.use("/collections", collectionsRoutes);
app.use("/nft", nftRoutes);
app.use("/contract", contractRoutes);

app.use('/', function(req,res){
    return res.status(200).send({ code: 200 });
});


