import mongoose from "mongoose";

const DBconnection=async()=>{
    const connection= await mongoose.connect(process.env.DB_URL).then(()=>{
        console.log(`DB connected.....`);
    }).catch((err)=>{
        console.log(`fail to connect BD..`,err);
    })
}

export default DBconnection