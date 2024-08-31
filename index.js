import express from 'express'
import* as dotenv from 'dotenv'
// import initApp from "./app.router.js";
// import sendEmail from './src/utlis/sendEmail.js'
dotenv.config()
const app=express()
const port =5000



// initApp(app,express)
// sendEmail({to:'nadamoustafa246@gmail.com',subject:'testt',text:'first test'})
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})





