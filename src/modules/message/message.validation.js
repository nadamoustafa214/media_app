import Joi from "joi";

export const createMessageSchema={
    body:Joi.object({
        message:Joi.string().min(1).max(500).required()
    }).required(),
    params:Joi.object({
        reciverId:Joi.string().min(24).max(24).required()
    }).required()
}

export const deleteMessagesSchema={
    params:Joi.object({
        id:Joi.string().max(24).min(24).required()
    }).required()
}