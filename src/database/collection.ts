import mongoose from "mongoose";
import Collection from "../models/Collection";
import Nft from "../models/Nft";
import Transaction from "../models/Transaction";

export const CreateCollection = (data)=>{
    return new Promise((resolve, reject)=>{
        new Collection(data).save().then((saved)=>{
            resolve(saved);
        }).catch((err)=>{
            reject(err);
        });
    });
};

export const Delete = (_id: string, account: string)=>{
    return new Promise((resolve, reject)=>{
        Collection.deleteOne({ _id: new mongoose.Types.ObjectId(_id), owner: account }, (err)=>{
            if(!err){
                resolve({ code: 200 });
            }else{
                reject({ code: 404, msg: "not found" });
            }
        });
    });
};

export const UpdateCollection = (data)=>{
    return new Promise((resolve, reject)=>{
        Collection.updateOne({ _id: new mongoose.Types.ObjectId(data._id) }, { $set:{ 
                address: data.address,
                owner: data.owner,
                name: data.name,
                description: data.description,
                logo: data.logo,
                author: data.author,
                type: data.type,
                totalSupply: data.totalSupply
         }}, { upsert: true } , (err,user)=>{
            if(!err){
               resolve(user);
            }else{
                reject({ code: 404, msg: "not found" });
            }
        });
    });
};

export const GetCollection = (address: string)=>{
    return new Promise((resolve, reject)=>{
        let usersProjection = { 
            __v: false,
            updatedAt: false
        };
        Collection.findOne({ address: address }, usersProjection, (err,doc)=>{
            if(doc){
                resolve(doc);
            }else{
                reject({ code: 404, msg: "not found" });
            }
        });
    });
};

export const GetMyCollections = (address: string)=>{
    return new Promise((resolve, reject)=>{
        let usersProjection = { 
            __v: false,
            updatedAt: false
        };
        Collection.find({ owner: address }, usersProjection, (err,docs)=>{
            if(docs){
                resolve(docs);
            }else{
                reject({ code: 404, msg: "not found" });
            }
        });
    });
};


export const GetCollections = (type: string)=>{
    return new Promise((resolve, reject)=>{
        let usersProjection = { 
            __v: false,
            updatedAt: false
        };
        let filter = type ? { type : type } : {};
        Collection.find(filter, usersProjection, (err,docs)=>{

            if(docs.length){

                 let addresses = [];
                 docs.forEach((collection)=>{
                    addresses.push(collection.address);

                 });

                 Nft.find({ address: { "$in": addresses }})
                 .exec((err, nfts)=>{

                    let result = [];
                    docs.forEach((doc)=>{
                        let collection = doc.toObject();
                        let nft = nfts.filter((n)=>{ return n.address == doc.address });
                        if(nft.length){
                            collection.nft = nft[0];
                            result.push(collection);
                        }
                    });

                    resolve(result);

                 });
            }else{
                reject({ code: 404, msg: "not found" });
            }
        });
    });
};

export const Collections = (text: string, from: string)=>{

    return new Promise((resolve, reject)=>{

        let date = new Date(from);
        
        let filter = text ? { 
            "$or": [ { name : { "$regex" : new RegExp(text, "i") }}, { author : { "$regex" : new RegExp(text, "i") }}],
            "createdAt": { $gte: date }
        } : {  "createdAt": { $gte: date } };

        let month = new Date();
        month.setMonth(month.getMonth() - 1);   
        month.setHours(0, 0, 0, 0);

        let month2 = new Date();
        month2.setMonth(month.getMonth() - 2);   
        month2.setHours(0, 0, 0, 0);

        let prices = {};
        let volume = {};
        let volume30 = {};
        let volume60 = {};
        let owners = {};
        let sales = {};

        Collection.find(filter)
        .exec((err, collesctions)=>{

            if(!err){

                 let addresses = [];
                 collesctions.forEach((collection)=>{
                    addresses.push(collection.address);
                    prices[collection.address] = 0;
                    volume[collection.address] = 0;
                    volume30[collection.address] = 0;
                    volume60[collection.address] = 0;
                    sales[collection.address] = 0;
                    owners[collection.address] = new Set();
                 });

                 Nft.find({ address: { "$in": addresses }})
                 .exec((err, nfts)=>{
                    if(!err){
                        
                        nfts.forEach((nft)=>{
                            prices[nft.address] += nft.price;
                            owners[nft.address].add(nft.owner)
                        });
                        
                        Transaction.find({ contract: { "$in": addresses }})
                        .exec((err, transactions)=>{
                            if(!err){

                                transactions.forEach((trans: any)=>{
                                    let date = new Date(trans.createdAt);
                                    volume[trans.contract] += trans.eth;
                                    if(date > month){
                                        volume30[trans.contract] += trans.eth;
                                    }else if( date < month && date > month2){
                                        volume60[trans.contract] += trans.eth;
                                    }
                                    
                                    if(trans.type === "buy nft"){
                                        sales[trans.contract]++;
                                    }
                                });

                                let result = [];
                                collesctions.forEach((coll)=>{

                                     let collection = coll.toObject();
                                     collection.price = prices[collection.address];
                                     collection.volume = volume[collection.address];
                                     let vol30 = volume30[collection.address];
                                     let vol60 = volume60[collection.address];
                                     collection.volume30 = vol30
                                     collection.owners = owners[collection.address].size;
                                     collection.sales = sales[collection.address];
                                     const differens = 100 * Math.abs( ( vol30 - vol60 ) / ( (vol30+vol60)/2 ) );
                                     if(differens){
                                        collection.diff = vol30 > vol60 ? '+ ' + differens : '- ' + differens;
                                     }else{
                                        collection.diff = '0%';
                                     }
                                     result.push(collection);

                                 });

                                 resolve(result);
                                
                            }else{
                                reject(err);
                            }
                        });

                    }else{
                        reject(err);
                    }
                 });

             }else{
                 reject(err);
             }
        });

    });
};

export const Popular = (text: string, from: string)=>{

    return new Promise((resolve, reject)=>{

        let date = new Date(from);
        
        let filter = text ? { 
            "$or": [ { name : { "$regex" : new RegExp(text, "i") }}, { author : { "$regex" : new RegExp(text, "i") }}],
            "createdAt": { $gte: date }
        } : {  "createdAt": { $gte: date } };

        let collectionsMap = {};

        Collection.find(filter)
        .exec((err, collesctions)=>{

            if(!err){

                 let addresses = [];
                 collesctions.forEach((collection)=>{
                    addresses.push(collection.address);
                    collectionsMap[collection.address] = collection.name;
                 });

                 Nft.find({ address: { "$in": addresses }})
                 .exec((err, nfts)=>{
                    if(!err){
                        
                        let result = [];
                        nfts.forEach((nft)=>{
                            let nftObj = nft.toObject();
                            nftObj.collection = collectionsMap[nftObj.address];
                            result.push(nftObj);
                        });
                        
                        resolve(result);

                    }else{
                        reject(err);
                    }
                 });

             }else{
                 reject(err);
             }
        });

    });
};

export const ByType = (type: string, limit: number)=>{

    return new Promise((resolve, reject)=>{

        let collectionsMap = {};
        let collectionsAuthors = {};

        Collection.find({ type: type })
        .exec((err, collesctions)=>{

            if(!err){

                 let addresses = [];
                 collesctions.forEach((collection)=>{
                    addresses.push(collection.address);
                    collectionsMap[collection.address] = collection.name;
                    collectionsAuthors[collection.address] = collection.author;
                 });

                 Nft.find({ address: { "$in": addresses }})
                 .sort({ createdAt:-1})
                 .limit(limit)
                 .exec((err, nfts)=>{
                    if(!err){
                        
                        let result = [];
                        nfts.forEach((nft, i)=>{
                            let nftObj = nft.toObject();
                            nftObj.collection = collectionsMap[nftObj.address];
                            nftObj.author = collectionsAuthors[nftObj.address];
                            result.push(nftObj);
                        });
                        
                        resolve(result);

                    }else{
                        reject(err);
                    }
                 });

             }else{
                 reject(err);
             }
        });

    });
};

export const PopularCollections = (from: string)=>{

    return new Promise((resolve, reject)=>{

        let date = new Date(from);
        
        let filter =  {  "createdAt": { $gte: date }, type: { $ne: "launchpad" } };
        let collectionsMap = {};
        let collectionsAuthors = {};

        Collection.find(filter)
        .limit(4)
        .exec((err, collesctions)=>{
            if(!err){

                let addresses = [];
                collesctions.forEach((collection)=>{
                   addresses.push(collection.address);
                   collectionsMap[collection.address] = collection.name;
                   collectionsAuthors[collection.address] = collection.author;
                });

                Nft.find({ address: { "$in": addresses }})
                .exec((err, nfts)=>{

                   let result = [];
                   collesctions.forEach((doc)=>{
                       let collection = doc.toObject();
                       let nftsImages = nfts.filter((n)=>{ return n.address == doc.address });
                       if(nftsImages.length){
                           collection.nfts = nftsImages;
                           result.push(collection);
                       }
                   });

                   resolve(result);

                });

                
             }else{
                 reject(err);
             }
        });

    });
};
