import jwt  from "jsonwebtoken"
import { User } from "../models/userSchemaModle.js"

export const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "")
        console.log("token error", token);
        
       const decodeToken = jwt.verify(token, process.env.ACCES_TOKEN_SECRET, function (err, result) {
            if (err) {
                return null
            }else{
                return result
            }
       })
       console.log("dcode error",decodeToken);
       
       if (!decodeToken) {
            return res.json("invalid token")
       }
       const user = await User.findById(decodeToken.id)
       console.log(user);
       if (!user) {
            return res.json("invalid user token")
       }
       req.user = user
        next()
    } catch (error) {
        console.log("auth error 1111", error);
        
    }
}