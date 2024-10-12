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
        select: false
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


// accesToken create 
userSchema.methods.generateAccesToken = async function() {
    return jwt.sign({
        id:this._id,
        email: this.email
    }, ACCES_TOKEN_SECRET, { expiresIn: process.env.ACCES_TOKEN_EXPIRE});
}

// RefreshToken create 
userSchema.methods.generateRefreshToken = async function() {
    return jwt.sign({
        id:this._id,
        email: this.email
    }, REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRE});
}


export  const User = mongoose.model("User", userSchema)
