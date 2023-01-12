import mongoose from "mongoose";
import * as collectionsDb from "../database/collection";
import { saveImage, resize } from "../util/image";

export const CreateCollection = (data: any)=>{
    return new Promise((resolve, reject)=>{
        resize(data.logo).then(( base64 )=>{
            data.logo = base64;
            collectionsDb.CreateCollection(data).then((saved: any)=>{
                resolve(saved)
            }).catch((err)=>{
                reject(err);
            });
        });
    });
}

export const UpdateCollection = (data: any)=>{
    return new Promise((resolve, reject)=>{
        if(data.file){
            resize(data.file).then((path: string)=>{
                data.logo = path;
                collectionsDb.UpdateCollection(data).then((saved: any)=>{
                    resolve(saved)
                }).catch((err)=>{
                    reject(err);
                });
            });
        }else{
            collectionsDb.UpdateCollection(data).then((saved: any)=>{
                resolve(saved)
            }).catch((err)=>{
                reject(err);
            });
        }
    });
}

export const GetCollection = (address: string)=>{
    return new Promise((resolve, reject)=>{
        collectionsDb.GetCollection(address).then((saved: any)=>{
            resolve(saved)
        }).catch((err)=>{
            reject(err);
        });
    });
}

export const GetMyCollections = (address: string)=>{
    return new Promise((resolve, reject)=>{
        collectionsDb.GetMyCollections(address).then((saved: any)=>{
            resolve(saved)
        }).catch((err)=>{
            reject(err);
        });
    });
}

export const GetCollections = (type: string)=>{
    return new Promise((resolve, reject)=>{
        collectionsDb.GetCollections(type).then((saved: any)=>{
            resolve(saved)
        }).catch((err)=>{
            reject(err);
        });
    });
}

export const Collections = (text: string, from: string)=>{
    return new Promise((resolve, reject)=>{
        collectionsDb.Collections(text, from).then((saved: any)=>{
            resolve(saved)
        }).catch((err)=>{
            reject(err);
        });
    });
}

export const Popular = (text: string, from: string)=>{
    return new Promise((resolve, reject)=>{
        collectionsDb.Popular(text, from).then((saved: any)=>{
            resolve(saved)
        }).catch((err)=>{
            reject(err);
        });
    });
}

export const Delete = (_id: string, account: string)=>{
    return new Promise((resolve, reject)=>{
        collectionsDb.Delete(_id, account).then((saved: any)=>{
            resolve(saved)
        }).catch((err)=>{
            reject(err);
        });
    });
}

export const ByType = (type: string, limit: number)=>{
    return new Promise((resolve, reject)=>{
        collectionsDb.ByType(type, limit).then((saved: any)=>{
            resolve(saved)
        }).catch((err)=>{
            reject(err);
        });
    });
}

export const PopularCollections = (from: string)=>{
    return new Promise((resolve, reject)=>{
        collectionsDb.PopularCollections(from).then((saved: any)=>{
            resolve(saved)
        }).catch((err)=>{
            reject(err);
        });
    });
}