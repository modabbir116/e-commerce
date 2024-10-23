import mongoose, {Schema} from "mongoose";

const catagorySchema = new Schema({
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
    subCategory: {
        typeof: mongoose.Types.ObjectId,
        ref: "subcategory"
    }
}, {timestamps:true})

export const Category = mongoose.model("Category", catagorySchema)