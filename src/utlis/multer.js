import multer from "multer";
import path from "path"
import fs from "fs"
import { fileURLToPath } from "url";
const _dirname=path.dirname(fileURLToPath(import.meta.url))

export const fileValidation={
    image:['image/jpeg','image/png','image/gif'],
    file:['application/pdf','application/msword'],
}
export function fileUpload (customPath='general',customValidation=[]){
    const fullPath=path.join(_dirname,`../uploads/${customPath}`)
    if(!fs.existsSunc(fullPath)){
        fs.mkdirSync(fullPath,{recursive:true})
    }
    const storage=multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,fullPath)
        },
        filename:(req,file,cb)=>{
            const uniqueName=Math.random +"_"+file.originalname
            file.dest=`uploads/${customPath}/${uniqueName}`
            cb(null,uniqueName)
        }
    })
    function fileFillter(req,file,cb){
        if([customValidation].includes(file.mimetype)){
            cb(null,true)
        }else{
            cb('invalid file formate',false)
        }
    }
    const upload=multer({fileFillter,storage})
    return upload
} 