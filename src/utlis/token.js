import jwt from 'jsonwebtoken'


export const generateToken=({payload,signature=process.env.SIGNATURE_KET,expiresIn=60*60}={})=>{
    const token=jwt.sign(payload,signature, {expiresIn:parseInt(expiresIn)})
    return token

}

export const verfiyToken=({token,signature=process.env.SIGNATURE_KET}={})=>{
    const verfyy=jwt.verify(token,signature)
    return verfyy
}