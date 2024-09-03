import postModel from "../../../../DB/models/Post.model.js";
// import messageModel from "../../../../DB/models/Post.model.js";
import userModel from '../../../../DB/models/User.model.js'
import cloudinary from "../../../utlis/cloudinary.js";



export const newPost=async(req,res,next)=>{
    const user=await userModel.findById(req.user._id)
    if(!user){
        return next(new Error('user not found '))
    }
    const {secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,{folder:`user/posts/${user._id}`})
    const post=await postModel.create({title:req.body.title,image:{secure_url,public_id},userId:req.user._id})
    return res.status(200).json({message:"done",post})
}