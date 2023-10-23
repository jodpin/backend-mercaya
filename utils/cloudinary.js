import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_key,
  api_secret: process.env.CLOUDINARY_api_secret,
  secure: true,
});

export const uploadImage = async (filePath) => {
  try {
    return await cloudinary.uploader.upload(filePath, {
      folder: "imagenes1",
    });
  } catch (error) {
    console.log(error);
  }
};

export async function deleteImage(publicId) {
  return await cloudinary.uploader.destroy(publicId);
}
