import {verfiyToken} from "../utlis/token.js";
import userModel from "../../DB/models/User.model.js";


const auth=async (req,res,next)=>{
    try {
        const { authorization}=req.headers
        if(!authorization){
            return res.json({message:"token is required"})
        }
        if(!authorization.startsWith(process.env.BERAR_KEY)){
            return res.json({message:"berrar key is required"})
        }
        const payload=authorization.split(process.env.BERAR_KEY)[1]
        if(!payload){
            return res.json({message:"token is required"})
        }
        const decoded=verfiyToken({token:payload})
        if(!decoded.id){
            return res.json({message:"invalid payload"})
        }
        const user=await userModel.findById(decoded.id)
        if(!user){
            return res.json({message:"not register account"})
        }
        req.user=user
        return next()
    }catch (err){
        return res.json({message:"catch error",err})
    }

}
export default auth