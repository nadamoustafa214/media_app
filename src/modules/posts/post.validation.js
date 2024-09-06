import Joi from "joi";
import { fields } from "../../middleware/validation.middleware.js";

export const newPostSchema={
    body:Joi.object({
        title:Joi.string().min(1).required(),
        caption:Joi.string(),
        userId:fields.id
    }),
    file:fields.file
}

export const updatedPostSchema={
    body:Joi.object({
        title:Joi.string().min(1).required(),
        caption:Joi.string()
    }).required(),
    file:fields.file,
    params:Joi.object({
        id:fields.id
    }).required()
}

export const deletePostSchema={
    params:Joi.object({
        id:fields.id
    }).required()
}

export const likeOrUnlikePostSchema={
    params:Joi.object({
        id:fields.id,
        commentId:fields.id,
        postId:fields.id
    }).required()
}

export const createCommentSchema={
    params:Joi.object({
        id:fields.id.required()
    }),
    file:fields.file
}

export const updatedCommentSchema={
    file:fields.file,
    params:Joi.object({
        id:fields.id.required()
    }).required()
}

export const deleteCommentSchema={
    params:Joi.object({
        commentId:fields.id.required(),
        postId:fields.id.required(),
    }).required()
}