import * as transactionsDb from "../database/transactions";

export const CreateTransaction = (data: any)=>{
    return new Promise((resolve, reject)=>{
        transactionsDb.CreateTransaction(data).then((saved: any)=>{
            resolve(saved)
        }).catch((err)=>{
            reject(err);
        });
    });
}

export const GetTransactions = (address: string)=>{
    return new Promise((resolve, reject)=>{
        transactionsDb.GetTransactions(address).then((saved: any)=>{
            resolve(saved)
        }).catch((err)=>{
            reject(err);
        });
    });
}

export const GetBalance = (address: string)=>{
    return new Promise((resolve, reject)=>{
        transactionsDb.Getbalance(address).then((saved: any)=>{
            resolve(saved)
        }).catch((err)=>{
            reject(err);
        });
    });
}

export const GetVolume = (address: string)=>{
    return new Promise((resolve, reject)=>{
        transactionsDb.GetVolume(address).then((saved: any)=>{
            resolve(saved)
        }).catch((err)=>{
            reject(err);
        });
    });
}
