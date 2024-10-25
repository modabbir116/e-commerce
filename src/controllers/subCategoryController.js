import ApiResponse from '../utils/ApiResponse.js';
import { subCategory } from "../modelsSchema/subCategorySchema.js";
import { Category } from '../modelsSchema/cetagorySchemaModle.js';

const createSubCategory = async (req, res) =>{
    try {
        let subSlug
        const {name, slug, category} = req.body
        if (!(name && category)) {
            return res.json(new ApiResponse(400, "name and category are  requied"))
        }
        if (!slug) {
            subSlug = name.replace(" ", "-").toLowerCase()
        }else{
            subSlug = slug.replace(" ", "-").toLowerCase()
        }
        const subCategory1 = await subCategory.create({ name, slug: subSlug, category })
        await Category.updateOne({ _id:category}, { $push: { subCategory: subCategory1._id }})
        
        return res.json(new ApiResponse(201, "subCategory created", {subCategory1}))  
    } catch (error) {
        console.log("subcategory error", error);
        
    }
}

const allSubCategory = async (req, res) =>{
    try {
        const data = await subCategory.find().populate("category")
        return res.json(new ApiResponse(200, "all subcategoris", {data}))
    } catch (error) {
        console.log("all subCategory error", error);
        
    }
}

export {createSubCategory, allSubCategory}