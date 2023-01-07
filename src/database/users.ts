import User from "../models/User";

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
