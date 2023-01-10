import * as usersDb from "../database/users";

export const UpdateProfile = (data: any)=>{
    return new Promise((resolve, reject)=>{
        usersDb.UpdateProfile(data).then(()=>{
            resolve({ code: 200 });
        }).catch((err)=>{
            reject(err);
        });
    });
};

export const GetProfile = (address: string)=>{
    return new Promise((resolve, reject)=>{
        usersDb.GetProfile(address).then((user: any)=>{
            resolve(user);
        }).catch((err)=>{
            reject(err);
        });
    });
};

export const Get = (address: string)=>{
    return new Promise((resolve, reject)=>{
        usersDb.Get(address).then((user: any)=>{
            resolve(user);
        }).catch((err)=>{
            reject(err);
        });
    });
};

export const Users = ()=>{
    return new Promise((resolve, reject)=>{
        usersDb.Users().then((users: any)=>{
            resolve(users);
        }).catch((err)=>{
            reject(err);
        });
    });
};
