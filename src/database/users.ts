import User from "../models/User";
import Transaction from "../models/Transaction";
import Collection from "../models/Collection";
import Nft from "../models/Nft";

export const UpdateProfile = (data)=>{
    return new Promise((resolve, reject)=>{
        User.updateOne({ address: data.address }, { $set:{ 
            email: data.email,
            name: data.name,
            address: data.address
         }}, { upsert: true } , (err,user)=>{
            if(!err){
               resolve(user);
            }else{
                reject({ code: 404, msg: "not found" });
            }
        });
    });
};

export const Get = (address: string)=>{
    return new Promise((resolve, reject)=>{
        User.findOne({ address: address}, (err, user)=>{
            if(!user){
                 new User({ address: address })
                 .save((err, saved)=>{
                    resolve({ code: 200 });
                 });
            }else{
                resolve({ code: 200 });
            }
        });
    });
};

export const GetProfile = (address: string)=>{
    return new Promise((resolve, reject)=>{
        let usersProjection = { 
            __v: false,
            updatedAt: false,
            createdAt: false
        };
        User.findOne({ address: address }, usersProjection, (err,doc)=>{
            if(doc){
                resolve(doc);
            }else{
                reject({ code: 404, msg: "not found" });
            }
        });
    });
};



export const Users = ()=>{
    return new Promise((resolve, reject)=>{
        User.find()
        .exec((err, users)=>{
            if(!err){
                 
                let balances = {};
                const addresses = users.map((u)=>{ 
                    balances[u.address] = 0;
                    return u.address;
                });

                Transaction.find({ $or: [{ to: { $in: addresses } }, { from: { $in: addresses }}] }, (err,trxs)=>{
                    
                    trxs.forEach((trx)=>{
                        if(trx.from){
                            balances[trx.from] -= trx.eth;
                        }
                        if(trx.to){
                            balances[trx.to] += trx.eth;
                        }
                    });
                    
                    let result = users.map((u)=>{ 
                        let userObj = u.toObject();
                        userObj.serviceBalance = balances[userObj.address];
                        return userObj;
                    });

                    resolve(result);
                    
               });

            }else{
                reject(err);
            }
        });
    });
};
