import messageModel from "../../../../DB/models/Message.model.js";
import userModel from './../../../../DB/models/User.model.js'



export const sendMessage=async(req,res,next)=>{
const user=await userModel.findById(req.params.reciverId)
if(!user){
    return next(new Error("user not found",{cause:404}))
}
const newMessage=await messageModel.create({message:req.body.message,reciverId:req.params.reciverId})
return res.status(200).json({message:"send",newMessage})
}

export const getMessages=async(req,res,next)=>{
    const messages=await messageModel.find({reciverId:req.user._id})
    return res.status(200).json({message:"done",messages})
}
 export const deleteMessage=async(req,res,next)=>{
    const {id}=req.params
    const message=await messageModel.findByIdAndDelete(id)
    if(!message){
        return next(new Error("message not found",{cause:404}))
    }
    return res.status(200).json({message:"deleted successfully"})
 }

 export const getOneMessage=async(req,res,next)=>{
    const {id}=req.params
    const message=await messageModel.findById(id)
    if(!message){
        return next(new Error("message not found",{cause:404}))
    }
    return res.status(200).json({message:"done",message})
 }