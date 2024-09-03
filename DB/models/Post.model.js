import { Schema,model,Types } from "mongoose";

const postSchema=new Schema({
title:{
    type:String,
    required:true
},
caption:String,
image:{
    type:Object
},
userId:{
    type:Types.ObjectId,
    ref:"user",
    required:true
},
like:[{
    type:Types.ObjectId,
    ref:"user"
}],
dislike:[{
    type:Types.ObjectId,
    ref:"user"
}],
isDeleted:{
    type:Boolean,
    default:false
}

},{
    timestamps:true
})

const postModel=model("Post",postSchema)
export default postModel