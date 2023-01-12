import path from "path";
import base64ToImage from "base64-to-image";
const sharp = require('sharp');

export const saveImage = (baseImage, folder, name )=> {
    return new Promise((resolve, reject)=>{
        const dirname = path.resolve('./');
        let ext = baseImage.substring(baseImage.indexOf("/")+1, baseImage.indexOf(";base64"));
        const fullPath = `${dirname}/public/${folder}/`;
        const optionalObj = { fileName: name, type: ext };
        try{
            base64ToImage(baseImage, fullPath, optionalObj)
            const minpath = `${folder}/${name}.${ext}`;
            resolve(minpath)
        }
        catch(err){
           reject(err);
        }
    });
}

export const resize = (logo)=> {
    return new Promise((resolve, reject)=>{
        const parts = logo.split(',')
        let imgBuffer = Buffer.from(parts[1], 'base64');
        sharp(imgBuffer)
        .resize(100, 100)
        .toBuffer()
        .then((data) => {
            resolve(parts[0] + "," + data.toString('base64'))
        })
        .catch(err =>{
            reject(err);
        })
    });
}


