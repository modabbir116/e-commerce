import { User } from "../models/userSchemaModle.js";
import { mail } from "../utils/sendMailer.js";
import { verificationTemplet } from "../emailTemplet/verificationTemplet.js";



const creatUser = async(req, res) =>{
   try {
     const {displayName, email, password, phoneNumber } = req.body
     // email validation
     const isFound =await User.findOne({email})
    if (isFound) {
     return res.json("email ok")
    }
 
    // user create 
    const Users = await User.create({displayName, email, password, phoneNumber})
    const link = await Users.generateAccesToken()
    
    // mail authentication
    await mail(Users.email, "Varification", "hello", verificationTemplet(link))
    
    return res.json("all done")
   } catch (error) {
    console.error("create user error", error);
    // Handle different error types
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
   }
   
}
// email verificatio 
const emaiVarified = async(req, res) =>{
    try {
        const {link} = req.params
        const user = new User()
        const result = await user.AccesTokenVerify(link)
        console.log(result);
        
        if (result) {
            const UserFound = await User.findOne({email: result.email})
            if (UserFound) {
                return res.send("verified")
                
            }else{
                return res.send("invalide")
                
            }
        } else {
        
            return res.send("invalide url")
        }
        
    } catch (error) {
        console.log("verified error", error);
        
    }
}

export {creatUser, emaiVarified}