import userModel from "../../../../DB/models/User.model.js";
import {compare, hash} from "../../../utlis/hashAndCompare.js";
import {generateToken, verfiyToken} from "../../../utlis/token.js";
import {StatusCodes} from 'http-status-codes';
import sendEmail from './../../../utlis/sendEmail.js'


export const signup=async (req,res,next)=>{
        const {email,password,userName}=req.body
        const user= await userModel.findOne({email})
        if(user){
            return next(new Error("email exist"),{cause:StatusCodes.BAD_REQUEST})
        }
        const token=generateToken({payload:{email},expiresIn:60*5,signature:process.env.EMAIL_SIGNA})
        const link =`${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`

        const refreshToken=generateToken({payload:{email},expiresIn:60*60*24*30,signature:process.env.EMAIL_SIGNA})
        const refreshLink =`${req.protocol}://${req.headers.host}/auth/newConfirmEmail/${refreshToken}`

        const html=`<a href="${link}">click here to confirm your email</a>
        <br></br>
        <a href="${refreshLink}">request new email</a>

        `
        const info =await sendEmail({to:email,subject:"confirm Email",html:html})
        // if(!info){
        //     return next(new Error('email rejected',{cause:400}))
        // }
        const hashPassword=hash({plainText:password})
        const createdUser=await userModel.create({email,password:hashPassword,userName})
        return res.status(StatusCodes.ACCEPTED).json({message:"user",createdUser})
}


export const confirmEmail=async(req,res,next)=>{
    const {token}=req.params
    const decoded=verfiyToken({token,signature:process.env.EMAIL_SIGNA})
    const user= await userModel.updateOne({email:decoded.email},{confirmEmail:true})
    return user.modifiedCount ? res.status(200).json({message:"done"}): res.status(400).send('not regester account')
}

export const newConfirmEmail=async(req,res,next)=>{
    const {token}=req.params
    const {email}=verfiyToken({token,signature:process.env.EMAIL_SIGNA})
    const newToken=generateToken({payload:{email},expiresIn:60*2,signature:process.env.EMAIL_SIGNA})
        const link =`${req.protocol}://${req.headers.host}/auth/confirmEmail/${newToken}`

        const refreshLink =`${req.protocol}://${req.headers.host}/auth/newConfirmEmail/${newToken}`

        const html=`<a href="${link}">click here to confirm your email</a>
        <br></br>
        <a href="${refreshLink}">request new email</a>

        `
        const info =await sendEmail({to:email,subject:"confirm Email",html:html})
        // if(!info){
        //     return next(new Error('email rejected',{cause:400}))
        // }
        return res.status(200).send("<p>check your email</p>")
}

export  const login=async (req,res,next)=>{
        const {email,password}=req.body
        const user=await userModel.findOne({email})
        if(!user ||!compare({plainText:password,hashValue:user.password}) ) {
            return next(new Error("email or passwored is wrong"),{cause:StatusCodes.BAD_GATEWAY})

        }
        const token=generateToken({payload:{id:user._id,isLoggedIn:true,role:user.role}})
        return res.status(StatusCodes.OK).json({message:"Done",token})
}


