import Transaction from "../models/Transaction";

export const CreateTransaction = (data: any)=>{
    return new Promise((resolve, reject)=>{
            new Transaction(data)
            .save((err, saved)=>{
                if(!err){
                    resolve(saved);
                }else{
                    reject({ code: 404});
                }
            });
    });
}

export const GetTransactions = (address: string)=>{
    return new Promise((resolve, reject)=>{
        Transaction.find({ $or: [{ to: address }, { from: address}] }, (err,docs)=>{
            resolve(docs);
        });
    });
}

export const Getbalance = (address: string)=>{
    return new Promise((resolve, reject)=>{
        Transaction.find({ $or: [{ to: address }, { from: address}] }, (err,docs)=>{
             let total = 0;
             docs.forEach((d)=>{
                 if(d.from === address){
                    total -= d.eth;
                 }else if(d.to === address){
                    total += d.eth;
                 }
             });
             resolve({ balance: total });
        });
    });
}

export const GetVolume = (address: string)=>{
    return new Promise((resolve, reject)=>{
        Transaction.find({ contract:  address, type: "buy nft"}, (err,docs)=>{
             let total = 0;
             docs.forEach((d)=>{
                total += d.eth;
             });
             resolve({ volume: total });
        });
    });
}

