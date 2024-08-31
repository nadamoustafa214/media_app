import {Router} from "express";
import auth from "../../middleware/auth.middleware.js";
import * as UC from './controller/user.js'
import validation from './../../middleware/validation.middleware.js'
import * as validators from './userCRUD.validation.js'
import { fileUpload,fileValidation } from "../../utlis/cloudMulter.js";
const router=Router()

router.get("/profile",auth,UC.profile)
router.patch('/change-password',validation(validators.updatePasswordSchema),auth,UC.updatePassword)
router.get('/:id/profile',validation(validators.shareProfileSchema),UC.shareProfile)
router.put('/updateProfile',auth,fileUpload('',fileValidation.image).fields([
    { name: 'profilePicture', maxCount: 1 },
    { name: 'coverPicture', maxCount: 3 }
]),UC.updateUser)
// router.patch('/profilePic',auth,fileUpload(fileValidation.image).single('image'),UC.profilePic)



export default router