import { Schema,model,Types } from "mongoose";

const messageSchema=new Schema({
    message:{
        type:String,
        required:true
    },
    reciverId:{
        type:Types.ObjectId,
        ref:"user",
        required:true
    }

},{
    timestamps:true
})

const messageModel=model("message",messageSchema)
export default messageModel