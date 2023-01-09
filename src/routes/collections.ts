import express from "express";
import * as collectionFunctions from "../functions/collection";

const routes = express.Router();

routes.post("/create", (req, res)=>{

    let data = req.body;

    if(!data.address){
        return res.status(400).send("address parametr is required");
    }
    if(!data.name){
        return res.status(400).send("name parametr is required");
    }
    if(!data.description){
        return res.status(400).send("description parametr is required");
    }
    if(!data.owner){
        return res.status(400).send("owner parametr is required");
    }
    if(!data.author){
        return res.status(400).send("author parametr is required");
    }
    collectionFunctions.CreateCollection(data).then((doc: any)=>{
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
    if(!data.address){
        return res.status(400).send("address parametr is required");
    }
    if(!data.name){
        return res.status(400).send("name parametr is required");
    }
    if(!data.description){
        return res.status(400).send("description parametr is required");
    }
    if(!data.owner){
        return res.status(400).send("owner parametr is required");
    }
    if(!data.author){
        return res.status(400).send("author parametr is required");
    }
    collectionFunctions.UpdateCollection(data).then((doc: any)=>{
        return res.status(200).send(doc);
    }).catch((err)=>{
        return res.status(err.code ? err.code: 403).send(err);
    });
   
   
});

routes.post("/delete", (req, res)=>{

    let data = req.body;

    if(!data._id){
        return res.status(400).send("_id parametr is required");
    }
    if(!data.account){
        return res.status(400).send("account parametr is required");
    }
    collectionFunctions.Delete(data._id, data.account).then((doc: any)=>{
        return res.status(200).send(doc);
    }).catch((err)=>{
        return res.status(err.code ? err.code: 403).send(err);
    });
   
   
});

routes.get("/list", (req, res) => {

    let type = req.query.type;

    collectionFunctions.GetCollections(type).then((response) => {
        return res.status(200).send(response);
    }).catch((err) => {
        return res.status(400).send(err);
    });
});

routes.get("/get", (req, res) => {

    let address = req.query.address;

    if(!address){
        return res.status(400).send("address parametr is required");
    }

    collectionFunctions.GetCollection(address).then((response) => {
        return res.status(200).send(response);
    }).catch((err) => {
        return res.status(400).send(err);
    });
});

routes.get("/my", (req, res) => {

    let address = req.query.address;

    if(!address){
        return res.status(400).send("address parametr is required");
    }

    collectionFunctions.GetMyCollections(address).then((response) => {
        return res.status(200).send(response);
    }).catch((err) => {
        return res.status(400).send(err);
    });
});


routes.get("/collections", (req, res) => {

    let text = req.query.text;
    let from = req.query.from;

    collectionFunctions.Collections(text, from).then((response) => {
        return res.status(200).send(response);
    }).catch((err) => {
        return res.status(400).send(err);
    });
});

routes.get("/popular", (req, res) => {

    let text = req.query.text;
    let from = req.query.from;

    collectionFunctions.Popular(text, from).then((response) => {
        return res.status(200).send(response);
    }).catch((err) => {
        return res.status(400).send(err);
    });
});

routes.get("/popular", (req, res) => {

    let text = req.query.text;
    let from = req.query.from;

    collectionFunctions.Popular(text, from).then((response) => {
        return res.status(200).send(response);
    }).catch((err) => {
        return res.status(400).send(err);
    });
});

routes.get("/collections-popular", (req, res) => {

    let from = req.query.from;

    collectionFunctions.PopularCollections(from).then((response) => {
        return res.status(200).send(response);
    }).catch((err) => {
        return res.status(400).send(err);
    });
});

routes.get("/type", (req, res) => {

    let type = req.query.type;
    let limit = parseInt(req.query.limit);

    collectionFunctions.ByType(type, limit).then((response) => {
        return res.status(200).send(response);
    }).catch((err) => {
        return res.status(400).send(err);
    });
});

export default routes;