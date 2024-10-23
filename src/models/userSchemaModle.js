import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {mongoose, Schema} from "mongoose";

const userSchema = new Schema({
    displayName: {
        type: String,
        required: [true, "Name is Required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is Required"],
        trim: true,
        unique: true,
        lowercase: true
    },
    password:{
        type: String,
        required: [true, "Password is Required"],
        mainLength: [8, "minimum length is 8"],
    },
    emailVerified:{
        type: Date,   
    },
    phoneNumber: {
        type: String,
        unique: true
        
    },
    resetPassword:{
        type: String, 
    },
    profilePic: {
        type: String
    },
    public_Id:{
        type: String
    },
    role:{
        type: String,
        enum : ["user", "seller", "editor", "admin"],
        lowercase: true,
        default: "user"
    },
    address:[
        {steeet: {
            type: String
        }}, 
        {postcode: String}, 
        {distric: String}, 
        {country: String},
    ],
    refreshToken:{
        type: String,
    }
}, {
    timestamps: true
})


// pasword validation or hashing 
userSchema.pre('save', async function(next) {                                                                                                                                        
    if(this.isModified('password')) {                                                                                                                                                        
        this.password = await bcrypt.hash(this.password, 10)  
    }                                                                                                                                                                          
    next()                                                                                                                                                                     
})

// passwoard compare 
userSchema.methods.checkPassword = async function(mypasswoard){
    console.log(mypasswoard);
    console.log(this.password);
    return await bcrypt.compare(mypasswoard, this.password,);
    
//    return await bcrypt.compare(mypasswoard, this.passwoard)

}


// accesToken create 
userSchema.methods.generateAccesToken = async function() {
    return jwt.sign({
        id:this._id,
        email: this.email,
        displayName: this.displayName,
        role: this.role
    }, process.env.ACCES_TOKEN_SECRET, { expiresIn: process.env.ACCES_TOKEN_EXPIRE});
}

// RefreshToken create 
userSchema.methods.generateRefreshToken = async function() {
    return jwt.sign({
        id:this._id,
        email: this.email,
        displayName: this.displayName,
        role: this.role
    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRE});
}

// verify a token symmetric
userSchema.methods.AccesTokenVerify =  function(token) {
    return jwt.verify(token, process.env.ACCES_TOKEN_SECRET, function (err, decoded){
        if (err) {
            return null
        }

        return decoded
    });
}



export  const User = mongoose.model("User", userSchema)
