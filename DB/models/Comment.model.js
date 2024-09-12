
import { Schema,Types,model } from "mongoose";

const commentSchema=new Schema({
    text:{
        type:String,
        required:true
    },
    image:{
        type:Object
    },
    userId:{
        type:Types.ObjectId,
        ref:"User",
        required:true
    },
    postId:{
        type:Types.ObjectId,
        ref:"Post",
        required:true
    },
    reply:{
        type:Types.ObjectId,
        ref:"Comment"
    },
    like:[{
        type:Types.ObjectId,
        ref:"user"
    }],
    unlike:[{
        type:Types.ObjectId,
        ref:"user"
    }],
    isDeleted:{
        type:Boolean,
        default:false
    },
    total:{
        type:Number,
        default:0
    }

},{timestamps:true})

const commentModel=model('Comment',commentSchema)
export default commentModel