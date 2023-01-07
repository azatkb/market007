import express from "express";
import * as transactionsFunctions from "../functions/transactions";

const routes = express.Router();

routes.post("/create", (req, res)=>{

    let data = req.body;

    if(!data.type){
        return res.status(400).send("type parametr is required");
    }
    if(!data.status){
        return res.status(400).send("status parametr is required");
    }
    if(!data.eth){
        return res.status(400).send("eth parametr is required");
    }
    if(!data.crypto){
        return res.status(400).send("crypto parametr is required");
    }
    transactionsFunctions.CreateTransaction(data).then((doc: any)=>{
        return res.status(200).send(doc);
    }).catch((err)=>{
        return res.status(err.code ? err.code: 403).send(err);
    });
   
});

routes.get("/list", (req, res) => {
    let address = req.query.address;
    if(!address){
        return res.status(400).send("address parametr is required");
    }
    transactionsFunctions.GetTransactions(address).then((response) => {
        return res.status(200).send(response);
    }).catch((err) => {
        return res.status(400).send(err);
    });
});

routes.get("/balance", (req, res) => {
    let address = req.query.address;
    if(!address){
        return res.status(400).send("address parametr is required");
    }
    transactionsFunctions.GetBalance(address).then((response) => {
        return res.status(200).send(response);
    }).catch((err) => {
        return res.status(400).send(err);
    });
});

routes.get("/volume", (req, res) => {
    let address = req.query.address;
    if(!address){
        return res.status(400).send("address parametr is required");
    }
    transactionsFunctions.GetVolume(address).then((response) => {
        return res.status(200).send(response);
    }).catch((err) => {
        return res.status(400).send(err);
    });
});

export default routes;