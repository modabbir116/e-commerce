import mongoose, { Schema } from "mongoose";

const subCategorySchema = new Schema({
    name: {
        type: String,    // Corrected `typeof` to `type`
        unique: true,    // Unique constraint
        required: true   // Correct spelling for `required`
    },
    slug: {
        type: String,    // Corrected `typeof` to `type`
        unique: true,    // Unique constraint
        required: true   // Correct spelling for `required`
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, // Correct reference to ObjectId
        ref: "Category"   // Reference to the 'Category' model
    }
}, { timestamps: true });  // Add timestamps option

export const subCategory = mongoose.model("subCategory", subCategorySchema);
