import userModel from "../../../../DB/models/User.model.js"
import { compare, hash} from "./../../../utlis/hashAndCompare.js"
import {confirmEmail} from './../../../modules/auth/controller/auth.js'
import cloudinary from "../../../utlis/cloudinary.js"


export const profile=async(req,res,next)=>{
    const user=await userModel.findById(req.user._id).select('userName email age lastName firstName gender profilePic')
    return user? res.status(200).json({message:"done",user}):next(new Error("Not found",{cause:404}))

}
export const updatePassword=async(req,res,next)=>{
    const {newPassword,oldPassword}=req.body
    const user=await userModel.findById(req.user._id)
    const match=compare({plainText:oldPassword ,hashValue:user.password})
    if(!match){
        return next(new Error("password is incorrect",{cause:404}))
    }
    const hashNewPassword=hash({plainText:newPassword})
    user.password=hashNewPassword
    await user.save()
    
    return res.status(200).json({message:"password updated successfully"})

}
export const updateUser=async(req,res,next)=>{
    const user=await userModel.findById(req.user._id,{new:true})
    if(!user){
        return res.send('invalid user please login again')
    }
    if(req.body.email){
        confirmEmail()
    }
    if(req.body.npassword){
        const match=compare({plainText:req.body.password,hashValue:user.password})
        if(!match){
        return res.send('password is wrong please login again')
        }
        const hashPass=hash({plainText:req.body.npassword})
         user.password = hashPass
         await user.save()
    }
    if(req.file){
        const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{folder:`user/${req.user._id}/profile`})
        // const user=await userModel.findByIdAndUpdate(req.user._id,{profilePic:secure_url,profilePicId:public_id})
        if (user.profilePicId) {
        await cloudinary.uploader.destroy(user.profilePicId)
        }
        user.profilePic = secure_url;
        user.profilePicId = public_id;
        await user.save();
        // return res.json({message:"done",user})
    }
    if(req.files?.length){
        let covers=[]
        for(const file of req.files){
            const {secure_url,public_id}=await cloudinary.uploader.upload(file.path,{folder:`user/${req.user._id}/profile/cover`})
            covers.push({secure_url,public_id})
        }
        user.covers=covers
        await user.save()
    }
return res.json({message:"updated",user})
}



export const profilePic=async(req,res,next)=>{
    if(!req.file){
        return next(new Error('file is required'),{cause:400})
    }
    const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{folder:`user/${req.user._id}/profile`})
    const user=await userModel.findByIdAndUpdate(req.user._id,{profilePic:secure_url,profilePicId:public_id})
    await cloudinary.uploader.destroy(user.profilePicId)
    return res.json({message:"done",user})
}
export const shareProfile=async(req,res,next)=>{
    const{id}=req.params
    const user=await userModel.findById(id).select('userName email age lastName firstName gender profilePic')
    if(!user){
        return next(new Error('user not found',{cause:404}))
    }
    return res.status(200).json({message:'done',user})
}

export const deactiveAccount=async(req,res,next)=>{
    const user=await userModel.findById(req.user._id)
    if(!user){
        return next(new Error(' not login agin ',{cause:400}))
    }
    
}
