import mongoose, {Schema} from "mongoose";

const subCatagorySchema = new Schema({
    name: {
        typeof: String,
        unique: true,
        require: true
    },
    slug: {
        typeof: String,
        unique: true,
        require: true
    },
    category: {
        typeof: mongoose.Types.ObjectId,
        ref: "Category"
    }
}, {timestamps:true})

export const subCategory = mongoose.model("subCategory", subCatagorySchema)