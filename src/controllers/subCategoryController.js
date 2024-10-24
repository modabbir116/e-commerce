import ApiResponse from '../utils/ApiResponse.js';
import { subCategory } from "../modelsSchema/subCategorySchema.js";

export const createSubCategory = async (req, res) =>{
    try {
        let newSlug
        const {name, slug, category} = req.body
        if (!(name && category)) {
            return res.json(new ApiResponse(400, "name and category are  requied"))
        }
        if (!slug) {
            newSlug = name.replace(" ", "-").toLowerCase()
        }else{
            newSlug = slug.replace(" ", "-").toLowerCase()
        }
        const subcategory = await subCategory.create({ name, slug: newSlug, category })
        console.log("subcategory dao ",subcategory);
        return res.json(new ApiResponse(201, "subCategory created", {subcategory}))
        
    } catch (error) {
        console.log("subcategory error", error);
        
    }
}