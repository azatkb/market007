import express from "express";
import * as nftFunctions from "../functions/nft";

const routes = express.Router();

routes.post("/create", (req, res)=>{

    let data = req.body;

    if(!data.address){
        return res.status(400).send("address parametr is required");
    }
    if(!data.id){
        return res.status(400).send("id parametr is required");
    }
    if(!data.owner){
        return res.status(400).send("owner parametr is required");
    }
    if(!data.price){
        return res.status(400).send("price parametr is required");
    }
    if(!data.data){
        return res.status(400).send("data parametr is required");
    }
    if(!data.status){
        return res.status(400).send("status parametr is required");
    }
    nftFunctions.CreateNft(data).then((doc: any)=>{
        return res.status(200).send(doc);
    }).catch((err)=>{
        return res.status(err.code ? err.code: 403).send(err);
    });
   
});

routes.post("/update", (req, res)=>{

    let data = req.body;

    if(!data._id){
        return res.status(400).send("_id parametr is required");
    }
    if(!data.price){
        return res.status(400).send("price parametr is required");
    }
    if(!data.status){
        return res.status(400).send("status parametr is required");
    }
    nftFunctions.UpdateNft(data).then((doc: any)=>{
        return res.status(200).send(doc);
    }).catch((err)=>{
        return res.status(err.code ? err.code: 403).send(err);
    });
   
});

routes.post("/buy", (req, res)=>{

    let data = req.body;

    if(!data.id){
        return res.status(400).send("id parametr is required");
    }
    if(!data.address){
        return res.status(400).send("address parametr is required");
    }
    if(!data.eth){
        return res.status(400).send("eth parametr is required");
    }
    if(!data.crypto){
        return res.status(400).send("crypto parametr is required");
    }
    if(!data.from){
        return res.status(400).send("from parametr is required");
    }
    if(!data.to){
        return res.status(400).send("to parametr is required");
    }
    nftFunctions.BuyNft(data).then((doc: any)=>{
        return res.status(200).send(doc);
    }).catch((err)=>{
        return res.status(err.code ? err.code: 403).send(err);
    });
   
});

routes.post("/withdraw", (req, res)=>{

    let data = req.body;

    if(!data._id){
        return res.status(400).send("_id parametr is required");
    }
    if(!data.account){
        return res.status(400).send("address parametr is required");
    }

    nftFunctions.Withdraw(data).then((doc: any)=>{
        return res.status(200).send(doc);
    }).catch((err)=>{
        return res.status(err.code ? err.code: 403).send(err);
    });
   
});

routes.get("/collection", (req, res) => {

    let address = req.query.address;
    let limit = req.query.limit ? parseInt(req.query.limit) : 5;

    nftFunctions.GetNftCollection(address, limit).then((response) => {
        return res.status(200).send(response);
    }).catch((err) => {
        return res.status(400).send(err);
    });
});

routes.get("/get", (req, res) => {

    let _id = req.query.id;

    if(!_id){
        return res.status(400).send("id parametr is required");
    }

    nftFunctions.GetNft(_id).then((response) => {
        return res.status(200).send(response);
    }).catch((err) => {
        return res.status(400).send(err);
    });
});

routes.get("/get-my", (req, res) => {

    let address = req.query.address;

    if(!address){
        return res.status(400).send("id parametr is required");
    }

    nftFunctions.GetMy(address).then((response) => {
        return res.status(200).send(response);
    }).catch((err) => {
        return res.status(400).send(err);
    });
});

export default routes;