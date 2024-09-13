import {Router} from "express";
import * as PC from './controller/posts.js'
import * as CC from './controller/comment.js'
import validation from "../../middleware/validation.middleware.js";
import * as validators from './post.validation.js'
import { asyncHandler } from "../../utlis/errorHandling.js";
import auth from '../../middleware/auth.middleware.js'
import { fileUpload, fileValidation } from "../../utlis/cloudMulter.js";
const router=Router()


router.post('/newPost',auth,fileUpload(fileValidation.image).single('image'),validation(validators.newPostSchema),asyncHandler(PC.newPost))
router.patch('/like/:id',auth,validation(validators.likeOrUnlikePostSchema),asyncHandler(PC.likePost))
router.patch('/unlike/:id',auth,validation(validators.likeOrUnlikePostSchema),asyncHandler(PC.unlikePost))
router.put('/editPost/:id',auth,validation(validators.updatedPostSchema),fileUpload(fileValidation.image).single('image'),asyncHandler(PC.updatePost))
router.post('/delete/:id',auth,validation(validators.deletePostSchema),asyncHandler(PC.deletePost))
router.get('/getPosts',auth,asyncHandler(PC.getPosts))

// =================comment===================

router.post('/comment/:id',auth,fileUpload(fileValidation.image).single('image'),validation(validators.createCommentSchema),asyncHandler(CC.createComment))
router.post('/:postId/updateComment/:commentId',auth,fileUpload(fileValidation.image).single('image'),validation(validators.updatedCommentSchema),asyncHandler(CC.updateComment))
router.post('/:postId/deleteComment/:commentId',auth,validation(validators.deleteCommentSchema),asyncHandler(CC.deleteComment))
router.patch('/:postId/likeComment/:commentId',auth,validation(validators.likeOrUnlikePostSchema),asyncHandler(CC.likeComment))
router.patch('/:postId/unlikeComment/:commentId',auth,validation(validators.likeOrUnlikePostSchema),asyncHandler(CC.unlikeComment))
router.post('/:postId/comments',auth,asyncHandler(CC.getAllComments))





export default router