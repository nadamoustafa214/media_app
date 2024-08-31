import bcrypt from "bcryptjs"

export const hash=({plainText,saltRound=process.env.SALT_ROUND}={})=>{
    const hashValue=bcrypt.hashSync(plainText,parseInt(saltRound))
    return hashValue
}

export const compare=({plainText,hashValue}={})=>{
    const match=bcrypt.compareSync(plainText,hashValue)
    return match
}