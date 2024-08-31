import {Router} from "express";
import * as MC from './controller/message.js'
import validation from "../../middleware/validation.middleware.js";
import * as validators from './message.validation.js'
import { asyncHandler } from "../../utlis/errorHandling.js";
import auth from './../../middleware/auth.middleware.js'
const router=Router()


router.post('/:reciverId',validation(validators.createMessageSchema),asyncHandler(MC.sendMessage))
router.get('/all',auth,asyncHandler(MC.getMessages))
router.delete('/:id',validation(validators.deleteMessagesSchema),auth,asyncHandler(MC.deleteMessage))
router.get('/:id',validation(validators.deleteMessagesSchema),auth,asyncHandler(MC.getOneMessage))

export default router