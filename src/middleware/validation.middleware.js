import joi from "joi"
const dataMethods=['body','params','query']
export const fields={
    id:joi.string().min(24).max(24).required(),
    email:joi.string().email({minDomainSegments:2,tlds:{allow:['com']}}).required(),
    password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    cpassword:joi.string().valid(joi.ref("password")).required(),
    userName:joi.string().alphanum().required(),

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