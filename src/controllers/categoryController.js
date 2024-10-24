import apiResponse from "quick-response"
import { Category } from "../modelsSchema/cetagorySchemaModle.js"

export const  createCategory = async (req, res) =>{
    try {
        let newSlug
        const {name, slug} = req.body
        if (!name) {
            return res.json(apiResponse(400, "name is requied"))
        }
        if (!slug) {
            newSlug = name.replace(" ", "-").toLowerCase()
        }else{
            newSlug = slug.replace(" ", "-").toLowerCase()
        }
        const category = await Category.create({ name, slug: newSlug })
        return res.json(apiResponse(201, "category created", {category}))
    } catch (error) {
        console.log("category name slug create error", error);
        
    }
} 