import {Router} from "express";
import * as PC from './controller/posts.js'
import validation from "../../middleware/validation.middleware.js";
import * as validators from './post.validation.js'
import { asyncHandler } from "../../utlis/errorHandling.js";
import auth from '../../middleware/auth.middleware.js'
import { fileUpload, fileValidation } from "../../utlis/cloudMulter.js";
const router=Router()


router.post('/newPost',auth,fileUpload(fileValidation.image).single('image'),validation(validators.newPostSchema),asyncHandler(PC.newPost))
router.patch('/like/:id',auth,validation(validators.likeOrUnlikePostSchema),asyncHandler(PC.likePost))
router.patch('/unlike/:id',auth,validation(validators.likeOrUnlikePostSchema),asyncHandler(PC.unlikePost))
router.put('/editPost/:id',auth,validation(validators.updatedPostSchema),fileUpload(fileValidation.image).single('image'),PC.updatePost)
router.post('/delete/:id',auth,validation(validators.deletePostSchema),PC.deletePost)



export default router