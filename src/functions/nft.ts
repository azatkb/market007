import * as nftDb from "../database/nft";

export const CreateNft = (data: any)=>{
    return new Promise((resolve, reject)=>{
        nftDb.CreateNft(data).then((saved: any)=>{
            resolve(saved)
        }).catch((err)=>{
            reject(err);
        });
    });
}

export const UpdateNft = (data: any)=>{
    return new Promise((resolve, reject)=>{
        nftDb.UpdateNft(data).then((saved: any)=>{
            resolve(saved)
        }).catch((err)=>{
            reject(err);
        });
    });
}

export const GetNft = (_id: string)=>{
    return new Promise((resolve, reject)=>{
        nftDb.GetNft(_id).then((saved: any)=>{
            resolve(saved)
        }).catch((err)=>{
            reject(err);
        });
    });
}

export const GetNftCollection = (address: string, limit: number)=>{
    return new Promise((resolve, reject)=>{
        nftDb.GetNftCollection(address, limit).then((saved: any)=>{
            resolve(saved)
        }).catch((err)=>{
            reject(err);
        });
    });
}

export const BuyNft = (data: any)=>{
    return new Promise((resolve, reject)=>{
        nftDb.BuyNft(data).then((saved: any)=>{
            resolve(saved)
        }).catch((err)=>{
            reject(err);
        });
    });
}

export const GetMy = (address: string)=>{
    return new Promise((resolve, reject)=>{
        nftDb.GetMy(address).then((saved: any)=>{
            resolve(saved)
        }).catch((err)=>{
            reject(err);
        });
    });
}

export const Withdraw = (data: any)=>{
    return new Promise((resolve, reject)=>{
        nftDb.Withdraw(data).then((saved: any)=>{
            resolve(saved)
        }).catch((err)=>{
            reject(err);
        });
    });
}