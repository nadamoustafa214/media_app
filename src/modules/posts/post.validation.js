import Joi from "joi";
import { fields } from "../../middleware/validation.middleware.js";

export const newPostSchema={
    body:Joi.object({
        title:Joi.string().min(1).required(),
        caption:Joi.string(),
        userId:fields.id.required()
    }),
    file:fields.file
}