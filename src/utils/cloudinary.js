import { v2 as cloudinary } from 'cloudinary';
import { fs } from 'fs'; // for file reading and writing"

//Setting Clodinary configuration:
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
  secure: true,
});

//Uploading an Image:
const uploadImage = async (imagePath) => {
  const options = {
    resource_type: 'auto',
  };

  try {
    if (!imagePath) return null; // ! Or u can do something like throw and err etc:
    const result = await cloudinary.uploader.upload(imagePath, options);
    //After succesful upload then we have to del the localImage Path:
    console.log('Successful uploaded some thing: Details : ', result.public_id);
    return result;
  } catch (error) {
    //! Deleting locally saved temporary file:
    fs.unlinkSync(imagePath);
    console.error(error);
    return null;
  }
};
