import { User } from "../models/userSchemaModle.js";
import { mail } from "../utils/sendMailer.js";
import { verificationTemplet } from "../emailTemplet/verificationTemplet.js";



const creatUser = async(req, res) =>{
    const {displayName, email, password, phoneNumber } = req.body
    // email validation
    const isFound =await User.findOne({email})
   if (isFound) {
    return res.json("email ok")
   }

   // user create 
   const Users = await User.create({displayName, email, password, phoneNumber})
   
   // mail authentication
   await mail(Users.email, "Varification", "hello", verificationTemplet())
   
   return res.json("all done")
   
}

const emaiVarified = async(req, res) =>{

}

export {creatUser, emaiVarified}