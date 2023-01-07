import path from "path";
import base64ToImage from "base64-to-image";
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