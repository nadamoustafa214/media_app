import joi from 'joi'
import { fields } from '../../middleware/validation.middleware.js'
export const signUpSchema={
    body:joi.object({
        firstName:joi.string(),
        lastName:joi.string(),
        phone:joi.string(),
        age:joi.number().min(18).max(100),
        userName:fields.userName,
        email:fields.email,
        password:fields.password,
        cpassword:fields.cpassword,
        gender:joi.array().valid('male','female'),
    }).required()
}

export const loginSchema={
    body:joi.object({
        password:fields.password,
        email:fields.email
    }).required()
}