// Here we write all logics:
import asyncHandler from '../utils/asyncHandler.js';
import apiError from '../utils/apiError.js';
import { User } from '../modals/user.modal.js';
import uploadImage from '../utils/cloudinary.js';
import ApiResponse from '../utils/apiResponse.js';

const registerUser = asyncHandler(async (req, res) => {
  //Fetching Data:
  const { userName, fullName, email, password } = req.body;

  //Validation
  if ([fullName, userName, email, password].some((field) => !field || field.trim() === '')) {
    throw new apiError(400, 'All fields are required');
  }
  //Checking User exist or not:
  const existingUser = await User.findOne({
    $or: [{ email }, { userName }], // Check for both email and userName:
  });
  if (existingUser) {
    throw new apiError(409, 'User Already exist.');
  }

  //local Path of avatar (support both misspelled "avatar" and "avatar")
  const localavatarPath = req.files?.avatar?.[0]?.path;
  const localCoverImagePath = req.files?.coverImage?.[0]?.path;

  if (!localavatarPath) {
    throw new apiError(400, "Avatar file is required");
  }

  const avatar = await uploadImage(localavatarPath);
  // cover image is optional
  const coverImage = localCoverImagePath ? await uploadImage(localCoverImagePath) : null;
  //Checking avatar is available or not
  if (!avatar) {
    throw new apiError(400, "Avatar file is required");
  }
  //todo : -Now saving it to db :
  const user = await User.create({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    userName:userName.toLowerCase()
  });
  // checking successfully created or not:
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if(!createdUser){
    throw new apiError(500,"Somthing went wrong ehile reg user");
  };

  return res.status(201).json(
    new ApiResponse(200,createdUser,"User Registered Successfully")
  )

});

export default registerUser;
