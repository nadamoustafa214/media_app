import { Schema,model } from "mongoose";

const userSchema=new Schema({
    firstName:String,
    lastName:String,
    phone:String,
    age:Number,
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },gender:{
        type:String,
        default:"male",
        enum:["male","female"]
    },
    status:{
        type:String,
        default:"offline",
        enum:["offline","online","blocked"]
    },role:{
        type:String,
        default:"user",
        enum:["admin","user"]
    },confirmEmail:{
        type:Boolean,
        default:false
    },
    profilePic:String,
    profilePicId:String,
    covers:Array

},{
    timestamps:true
})

const userModel=model("user",userSchema)
export default userModel