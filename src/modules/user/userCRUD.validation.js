import Joi from "joi";
import { fields } from "../../middleware/validation.middleware.js";
export const updatePasswordSchema={
    body:Joi.object({
        newPassword:fields.password,
        oldPassword:fields.password.invalid(Joi.ref("newPassword")).required(),
        cPassword:fields.cpassword,
    }).required()
}

export const shareProfileSchema={
    params:Joi.object({
        id:fields.id
    }).required()
}