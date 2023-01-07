import express from "express";
import * as usersFunctions from "../functions/users";
const routes = express.Router();

routes.post("/update-user", (req, res) => {
    let data = req.body;
    if(!data.address){
        return res.status(400).send("address parametr is required");
    }
    usersFunctions.UpdateProfile(data).then((doc: any) => {
        return res.status(200).send(doc);
    }).catch((err) => {
        return res.status(err.code ? err.code : 403).send(err);
    });
});


routes.get("/user-profile", (req, res) => {
    let address = req.query.address;
    if(!address){
        return res.status(400).send("address parametr is required");
    }
    usersFunctions.GetProfile(address).then((response) => {
        return res.status(200).send(response);
    }).catch((err) => {
        return res.status(400).send(err);
    });
});

export default routes;