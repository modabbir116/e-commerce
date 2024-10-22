import { User } from "../models/userSchemaModle.js";
import { mail } from "../utils/sendMailer.js";
import { verificationTemplet } from "../emailTemplet/verificationTemplet.js";
import { cloudinaryImageUpload } from "../services/cloudinary.js";
import apiResponse from "quick-response";
import ApiResponse from "../utils/apiResponse.js";



// generate token 
const generateTokens = async(id) =>{
    try {
        const user = await User.findById({_id: id})
        const accessToken = await user.generateAccesToken()
        const refreshToken = await user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save()
        return {accessToken, refreshToken}
    } catch (error) {
        console.log("token arror", error);
    }
}
// user create part 
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
        
        if (result) {
            const {email} = result
            const UserFound = await User.findOne({email})
            if (UserFound.emaiVarified) {
                return res.send("all ready verified")
            }
            if (UserFound) {
                UserFound.emailVerified = Date.now(); // Set emailVerified to the current timestamp
                console.log("Email verified:", UserFound);
                await UserFound.save();
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


// login part start 
// const login = async (res, req) =>{
//     try {
//         const {email, password} = req.body
//         if (req.body.hasOwnProperty("email") && req.body.hasOwnProperty("password")) {
//             if ([email, password].some((field) => field === "")) {
//                 return res.send("all fields is required")
//             }  
//         }else{
//             return res.send("invalid")
//         }
//         // user email check 
//        const userFound = await User.findOne({email})
//        if (!userFound) {
//             return res.send("email or password worong 2")
//        }
//        // user password check 
//        const isPasswordCorret = await userFound.checkPassword(password)
//        if (!isPasswordCorret) {
//             return res.send("email or password worong 2")
//        }

//         // tokec accec
//         const {accesToken, refreshToken} = await generateTokens(userFound._id)
//         return res.json(accesToken, refreshToken)
//     } catch (error) {
//         console.log("login error", error);
//     }
// }

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if both email and password are provided
        if (!email || !password) {
            return res.send("All fields are required");
        }

        // Find user by email
        const userFound = await User.findOne({ email });
        if (!userFound) {
            return res.send("Email or password is incorrect 1");
        }

        // Check if the password is correct
        const isPasswordCorrect = await userFound.checkPassword(password);
        if (!isPasswordCorrect) {
            return res.send("Email or password is incorrect 2");
        }

        // Generate access and refresh tokens
        const {accessToken, refreshToken} = await generateTokens(userFound._id)
        return res.json(new ApiResponse().apiLoginRespse({accessToken, refreshToken}))
        
    } catch (error) {
        console.log("Login error:", error);
        res.status(500).send("Internal server error");
    }
};


// userUpdate Picture upload
const userProfile = async (req, res) => {
    if (req.file) {
       try {
        const {path} = req.file
        const user = await User.findById(req.user._id)
        if (user) {
            const imageResult = await cloudinaryImageUpload(path, user.displayName, "ProfilePic")
            user.profilePic = imageResult.optimizeUrl
            user.public_Id = imageResult.uploadResult.public_id
            await user.save()
            res.json(apiResponse(200, "Profile picture upload Success", {user}))
        }
       } catch (error) {
            console.log("user profile update", error);
            
       }
    }
    
}

export {creatUser, emaiVarified, login, userProfile}