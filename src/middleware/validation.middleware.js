import joi from "joi"
import { Types } from "mongoose"
const dataMethods=['body','params','query','headers','file']
// for check if objectid is valid
const validationObjectID=(value,helper)=>{
return Types.ObjectId.isValid(value)? true : helper.message('in-valid objectID')
}
export const fields={
    id:joi.string().custom(validationObjectID),
    email:joi.string().email({minDomainSegments:2,tlds:{allow:['com']}}).required(),
    password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    cpassword:joi.string().valid(joi.ref("password")).required(),
    userName:joi.string().alphanum().required(),
    file:joi.object(
        {
        size:joi.number().positive().required(),
        path:joi.string().required(),
        filename:joi.string().required(),
        destination:joi.string().required(),
        mimetype:joi.string().required(),
        encoding:joi.string().required(),
        originalname:joi.string().required(),
        fieldname:joi.string().required(),
        dest:joi.string()
    }
)

}
export const validation=(schema)=>{
    return (req,res,next)=>{
        const validationError=[]
        dataMethods.forEach(key=>{
             if(schema[key]){
                const dataToValid=req[key]
                const valiResult=schema[key].validate(dataToValid,{abortEarly:false})
              if(valiResult.error){
                validationError.push(valiResult.error.details)
        }
    }
    })
        if(validationError.length>0){
            return res.status(400).json({message:"validation error",validationError})
        }
        else{
                return next()
            }
    }
}

export default validation