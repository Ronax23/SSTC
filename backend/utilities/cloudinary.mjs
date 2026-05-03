import  {v2 as clouds} from 'cloudinary';
import fs from 'fs';


clouds.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (imagePath) => {

    const options = {
      use_filename: true,
      unique_filename: true,
      overwrite: true,
      resource_type: 'auto',
    };

    try {
      if(!imagePath)
      {
        throw new Error("Image path is required");
      }
      const result = await clouds.uploader.upload(imagePath, options);
      console.log(result);
      return result;
    } catch (error) {
        fs.unlink(imagePath);
      console.error(error);
    }
};

export default uploadImage;