import {Router} from "express";
import * as AC from "./controller/auth.js"
import validation from './../../../src/middleware/validation.middleware.js'
import * as validator from './../auth/user.validation.js'
import { asyncHandler } from "../../utlis/errorHandling.js";
const router=Router()

router.post("/signup",validation(validator.signUpSchema),asyncHandler(AC.signup))
router.get("/confirmEmail/:token",asyncHandler(AC.confirmEmail))
router.get('/newConfirmEmail/:token',asyncHandler(AC.newConfirmEmail))
router.post("/login",validation(validator.loginSchema),asyncHandler(AC.login))



export default router