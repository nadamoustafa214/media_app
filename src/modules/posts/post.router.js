import {Router} from "express";
import * as PC from './controller/posts.js'
import validation from "../../middleware/validation.middleware.js";
import * as validators from './post.validation.js'
import { asyncHandler } from "../../utlis/errorHandling.js";
import auth from '../../middleware/auth.middleware.js'
const router=Router()


router.post('/newPost',auth,validation(validators.newPostSchema),PC.newPost)

export default router