

export const asyncHandler=(fun)=>{
    return (req,res,next)=>{
        fun(req,res,next)
            .catch(err=>{
           return next(new Error(err),{cause:500})

        })
    }
}

export const globalError=(err,req,res,next)=>{
    if(err){
        if(process.env.MOOD=="Dev"){
            return res.status(err.cause||500).json({message:"catch error",err,stack:err.stack})
        }
        return res.status(err.cause||500).json({message:"catch error",err})

    }
}