import commentModel from "../../../../DB/models/Comment.model.js"
import postModel from "../../../../DB/models/Post.model.js"
import userModel from "../../../../DB/models/User.model.js"
import cloudinary from "../../../utlis/cloudinary.js"

export const createComment=async(req,res,next)=>{
    const post= await postModel.findById(req.params.id)
    if(!post){
        return next(new Error("post not found",{cause:400}))
    }
    const user= await userModel.findById(req.user._id)
    if(!user){
        return next(new Error ('user not found please login to comment in this post',{cause:400}))
    }
    let image={}
    if(req.file){
        const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{folder:`user/${req.params.id}/comment`})
        image={secure_url,public_id}
    }
    const comment=await commentModel.create({userId:user._id,postId:req.params.id,text:req.body.text,image})
    return res.status(201).json({message:"done",comment})

}

export const updateComment=async(req,res,next)=>{
    // image or text
// check if post exist and comment exist annnnd user if userid in commentmodel == user._d in auth
const checkComment=await commentModel.findById(req.params.commentId)
if(!checkComment ||checkComment.isDeleted==true){
    return next(new Error('comment not found'))
}
    const post= await postModel.findById(req.params.postId)
    if(!post||post.isDeleted==true){
        return next(new Error("post not found",{cause:400}))
    }
    const user= await userModel.findById(req.user._id) 
    if( !user || user._id.toString()!=checkComment.userId.toString()){
        return next(new Error(`invalid user `,{cause:400}))
    }
let image={}
    if(req.file){
        const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{folder:`user/${req.params.id}/comment`})
        image={secure_url,public_id}
    }
const commentUpdated =await commentModel.updateOne({ _id: req.params.commentId },{text:req.body.text,image})
if(!commentUpdated){
    return res.status(500).json({ error: 'Failed to update comment' });
}
     return res.status(200).json({message:"updated",commentUpdated})

}

export const deleteComment=async(req,res,next)=>{
    const comment=await commentModel.findById({_id:req.params.commentId})
    // const comment=await commentModel.findByIdAndUpdate({_id:req.params.commentId},{isDeleted:true}) 
    const user=await userModel.findById(req.user._id)

    if(user._id.toString()!=comment.userId.toString()){
        return next(new Error(`invalid user `,{cause:400}))
    }

    // if(req.user._id!=comment.userId){
    //     return next(new Error(`invalid user `,{cause:400}))
    // }
    if(req.params.postId!=comment.postId){
        return next(new Error(`invalid post `,{cause:400}))
    }
   if(comment.image!=null){
    await cloudinary.uploader.destroy(comment.image.public_id,comment.image.secure_url)
   }
    if(!comment){
        return next(new Error('comment not found',{cause:400}))
    }
    comment.isDeleted=true
    await comment.save()
    return res.status(200).json({message:"deleted"})
}

export const likeComment=async(req,res,next)=>{
    const {commentId,postId}=req.params
    const user=await userModel.findById(req.user._id)
    if(!user){
        return next(new Error('not found user'))
    }
    const post=await postModel.findById(postId)
    if(!post){
        return next (new Error('post not found'))
    }
    const comment=await commentModel.findByIdAndUpdate({_id:commentId},{$addToSet:{like:req.user._id},$pull:{unlike:req.user._id}},{new:true})
    if(!comment){
        return next(new Error('comment not found'))
    }
     comment.total= comment.like.length - comment.unlike.length
     await comment.save()
     return res.status(200).json({message:"done",comment})
}

export const unlikeComment=async(req,res,next)=>{
    const {commentId,postId}=req.params
    const user=await userModel.findById(req.user._id)
    if(!user){
        return next(new Error('not found user'))
    }
    const post=await postModel.findById(postId)
    if(!post){
        return next (new Error('post not found'))
    }
    const comment=await commentModel.findByIdAndUpdate({_id:commentId},{$addToSet:{unlike:req.user._id},$pull:{like:req.user._id}},{new:true})
    if(!comment){
        return next(new Error('comment not found'))
    }
    comment.total= comment.unlike.length - comment.like.length
     await comment.save()
     return res.status(200).json({message:"done",comment})
}

export const getAllComments=async(req,res,next)=>{
    const post=await postModel.findById(req.params.postId)
    if(!post){
        return next (new Error('post not found'))
    }
    const comments=await commentModel.find({postId:req.params.postId},{isDeleted:false})
    return res.status(200).json({message:"done",comments})

}
