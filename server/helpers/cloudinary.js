import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
//configure with cloudinary.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDE_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadMediaToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Error Upload to cloudinary");
  }
};
export const deleteMediaFromCloudinary = async (pathId) => {
  try {
    return await cloudinary.uploader.destroy(pathId);
  } catch (error) {
    console.log(error);
    throw new Error("Error Delete to cloudinary");
  }
};
