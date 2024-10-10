import { type } from "express/lib/response";
import {mongoose, Schema} from "mongoose";

const userSchema = new Schema({
    dispalyName: {
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
    phonNumber:{
        type: String,
        unique: true,
    },
    emailVerified:{
        type: Date,     
    },
    resetPassword:{
        type: String, 
    },
    role:{
        type: String,
        enum : ["user", "seller", "editor", "admin"],
        lowercase: true
    },
    address:[
        {steeet: {
            type: String
        }}, 
        {postcode: String}, 
        {distric: String}, 
        {country: String},
    ]
}, {
    timestamps: true
})

export const User = mongoose.model("User", userSchema)