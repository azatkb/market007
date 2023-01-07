import mongoose from "mongoose";
import Nft from "../models/Nft";
import Transaction from "../models/Transaction";
import Collection from "../models/Collection";

export const CreateNft = (data)=>{
    return new Promise((resolve, reject)=>{
        Collection.find({ address: data.address}, (err, docs)=>{
            if(docs.length == 0){
                new Collection({ name: data.name, address: data.address }).save().then((saved)=>{
                    new Nft(data).save().then((saved)=>{
                        resolve(saved);
                    }).catch((err)=>{
                        reject(err);
                    });
                }).catch((err)=>{
                    reject(err);
                });
            }else{
                new Nft(data).save().then((saved)=>{
                    resolve(saved);
                }).catch((err)=>{
                    reject(err);
                });
            }
        });
    });
};

export const UpdateNft = (data)=>{
    return new Promise((resolve, reject)=>{
        Nft.updateOne({ _id: new mongoose.Types.ObjectId(data._id), owner: data.account }, { $set:{ 
                price: data.price,
                status: data.status
         }}, { upsert: true } , (err,user)=>{
            if(!err){
               resolve(user);
            }else{
                reject({ code: 404, msg: "not found" });
            }
        });
    });
};

export const Withdraw = (data)=>{
    return new Promise((resolve, reject)=>{
        Nft.deleteOne({ _id: new mongoose.Types.ObjectId(data._id), owner: data.account } , (err,)=>{
            if(!err){
               resolve({ code: 200 });
            }else{
                reject({ code: 404, msg: "not found" });
            }
        });
    });
};

export const GetNft = (_id: string)=>{
    return new Promise((resolve, reject)=>{
        let usersProjection = { 
            __v: false,
            updatedAt: false
        };
        Nft.findOne({ _id: new mongoose.Types.ObjectId(_id) }, usersProjection, (err,doc)=>{
            if(doc){
                resolve(doc);
            }else{
                reject({ code: 404, msg: "not found" });
            }
        });
    });
};

export const GetNftCollection = (address: string, limit: number)=>{
    return new Promise((resolve, reject)=>{
        let usersProjection = { 
            __v: false,
            updatedAt: false
        };
        Nft.find({ address: address })
        .limit(limit)
        .exec((err,doc)=>{
            if(doc){
                resolve(doc);
            }else{
                reject({ code: 404, msg: "not found" });
            }
        });
    });
};

export const BuyNft = (data)=>{
    return new Promise((resolve, reject)=>{
         Nft.updateOne({ id: data.id, address: data.address }, { $set:{ 
                owner: data.from,
                status: 'delisted'
         }}, (err,user)=>{
            if(!err){
                new Transaction({
                    type: "buy nft", 
                    status: "completed", 
                    eth: data.eth, 
                    crypto: data.crypto,
                    from: data.from,
                    to: data.to,
                    contract: data.address
                }).save((err, saved)=>{
                    if(!err){
                        new Transaction({
                            type: "deposit", 
                            status: "completed", 
                            eth: data.eth, 
                            crypto: "eth",
                            to: data.from
                        }).save((err, saved)=>{
                            if(!err){
                                resolve(saved);
                            }else{
                                reject(err);
                            }
                        })
                    }else{
                        reject(err);
                    }
                })
            }else{
                reject({ code: 404, msg: "not found" });
            }
        });
    });
};

export const GetMy = (address: string)=>{
    return new Promise((resolve, reject)=>{
        Nft.find({ owner: address })
        .exec((err,doc)=>{
            if(doc){
                resolve(doc);
            }else{
                reject({ code: 404, msg: "not found" });
            }
        });
    });
};
