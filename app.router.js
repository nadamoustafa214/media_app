
import userRouter from "./src/modules/user/user.router.js";
import authRouter from "./src/modules/auth/auth.router.js";
import messageRouter from "./src/modules/message/message.router.js";
import DBconnection from "./DB/connection.js";
import {globalError} from "./src/utlis/errorHandling.js";


const initApp=(app,express)=>{
app.use(express.json({}))
    DBconnection()
    app.use("/user",userRouter)
    app.use("/auth",authRouter)
    app.use("/message",messageRouter)


    app.all("*",(req,res,next)=>{
        return res.json({message:"invalid routing"})
    })

    app.use(globalError)

}

export default initApp