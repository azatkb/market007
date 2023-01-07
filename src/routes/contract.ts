import express from "express";
import { CreateContract } from "../functions/contract";
const solc = require('solc');
const routes = express.Router();

routes.post("/create", (req, res) => {

    let data = req.body;

    if(!data.name){
        return res.status(400).send("name parametr is required");
    }
    if(!data.symbol){
        return res.status(400).send("symbol parametr is required");
    }

    const source = CreateContract("test", "Test");
   
    const input = {
       language: 'Solidity',
       sources: {
          'NFT.sol': {
             content: source,
          },
       },
       settings: {
          outputSelection: {
             '*': {
                '*': ['*'],
             },
          },
       },
    };
    
    try{

        const tempFile = JSON.parse(solc.compile(JSON.stringify(input)));
        const contractFile = tempFile.contracts['NFT.sol']['NFT'];
        const bytecode = contractFile.evm.bytecode.object;
        const abi = contractFile.abi;
        
        return res.status(200).send({ bytecode, abi });

    }catch(err){

        return res.status(500).send({ err });

    }

});


export default routes;