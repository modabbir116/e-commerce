import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,        // Correct data type
        unique: true,        // Unique constraint
        required: true       // Correct spelling for required
    },
    slug: {
        type: String,        // Corrected from `typeof` to `type`
        unique: true,        // Unique constraint
        required: true       // Correct spelling for required
    },
    subCategory: [
        {
            type: mongoose.Schema.Types.ObjectId, // Correct reference to ObjectId
            ref: "subcategory"   // Reference to the 'subcategory' model
        }
    ]
}, { timestamps: true });    // Add timestamps option

export const Category = mongoose.model("Category", categorySchema);
