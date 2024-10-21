import { v2 as cloudinary } from 'cloudinary';
import {unlinkSync} from 'fs'
import { configDotenv } from "dotenv"
configDotenv()

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });
    
    
 export const cloudinaryImageUpload = async (path, public_id, folder) =>{
    let  uploadResult;
        // Upload an image
        try {
            // Upload an image
            uploadResult = await cloudinary.uploader.upload(path, {
                public_id,
                folder
            });
            unlinkSync(path)
        } catch (error) {
            unlinkSync(path)
            console.log("Upload error:", error);
            return { error: "Image upload failed", uploadResult: null };
        }
        
        // Optimize delivery by resizing and applying auto-format and auto-quality
        const optimizeUrl = cloudinary.url(uploadResult.public_id, {
            fetch_format: 'auto',
            quality: 'auto'
        });
        
        
        // Transform the image: auto-crop to square aspect_ratio
        const autoCropUrl = cloudinary.url(uploadResult.public_id, {
            crop: 'auto',
            gravity: 'auto',
            width: 500,
            height: 500,
        });
        
    return {uploadResult, optimizeUrl, autoCropUrl}
}