import mongoose, { Schema } from "mongoose";

const productSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: mongoose.Types.ObjectId, 
        ref: "Category"  
    },
    subCategory:{
            type: mongoose.Types.ObjectId, 
            ref: "subcategory"  
    },
    thumbnail: {
        type: String
    },
    gallery: [
        {
            type: String
        }
    ],
    description: {
        type: String
    }
}, { timestamps: true

}) 

export const Product = mongoose.model("Product", productSchema)