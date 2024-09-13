import postModel from "../../../../DB/models/Post.model.js";
// import messageModel from "../../../../DB/models/Post.model.js";
import userModel from '../../../../DB/models/User.model.js'
import cloudinary from "../../../utlis/cloudinary.js";



export const newPost=async(req,res,next)=>{
    const user=await userModel.findById(req.user._id)
    if(!user){
        return next(new Error('user not found '))
    }
    let image;
    if(req.file){
    const {secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,{folder:`user/posts/${user._id}`})
    image={secure_url,public_id}
    }
    
    const post=await postModel.create({title:req.body.title,image,userId:req.user._id})
    return res.status(200).json({message:"done",post})
}

export const likePost=async(req,res,next)=>{
    const {id}=req.params
    const user=await userModel.findById(req.user._id)
    if(!user){
        return next(new Error('not found user'))
    }
    const post=await postModel.findByIdAndUpdate({_id:id},{$addToSet:{like:req.user._id},$pull:{unlike:req.user._id}},{new:true})
    if(!post){
        return next(new Error('post not found'))
    }
     post.total= post.like.length - post.unlike.length
     await post.save()
     return res.status(200).json({message:"done",post})
}

export const unlikePost=async(req,res,next)=>{
    const {id}=req.params
    const user=await userModel.findById(req.user._id)
    if(!user){
        return next(new Error('not found user'))
    }
    const post=await postModel.findByIdAndUpdate({_id:id},{$addToSet:{unlike:req.user._id},$pull:{like:req.user._id}},{new:true})
    if(!post){
        return next(new Error('post not found'))
    }
     post.total= post.unlike.length - post.like.length
     await post.save()
     return res.status(200).json({message:"done",post})
}

export const deletePost=async(req,res,next)=>{
    const {id}=req.params
    const user=await userModel.findById(req.user._id)
    if(!user){
        return next(new Error('in valid user',{cause:400}))
    }
    const post=await postModel.findByIdAndUpdate({_id:id},{isDeleted:true})
    if(!post){
        return next(new Error('post not found',{cause:400}))
    }
    return res.status(200).json({message:'done'})
}

export const updatePost=async(req,res,next)=>{
    const user=await userModel.findById(req.user._id)
    if(!user){
        return next(new Error('in valid user',{cause:400}))
    }
    let image={}
    if(req.file){
        const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{folder:`user/posts/${user._id}`})
        image={secure_url,public_id}
    }
    const post =await postModel.findByIdAndUpdate({_id:req.params.id},{title:req.body.title,caption:req.body.caption,image})
    if(!post){
        return next(new Error('post not found',{cause:400}))
    }else if(post.userId!=req.user._id){
        return next(new Error('login agin ',{cause:400}))

    }
    return res.status(200).json({message:"updated",post})
}

export const getPosts=async(req,res,next)=>{
    const user=await userModel.findById(req.user._id)
    if(!user){
        return next (new Error('user not found',{cause:400}))
    }
    const posts=await postModel.find({userId:user._id},{isDeleted:false})
    return res.status(200).json({message:"done",posts})
}