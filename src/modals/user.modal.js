import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, 'password is required'],
    },
    avtar: {
      type: String, // use cloudnary for uploading image and storing only URL in the DB
      required: true,
      unique: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
      },
    ],
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);

//Mongoose Hooks
userSchema.pre('save', async function (next) {
  // Take password and do hashing also create a json token for validation:
  // We want only once and at that time when pasword is modified then update it:
  if (!this.isModified('password')) return next();
  this.password = bcrypt.hash(this.password, 10); // 10 round hashing and salting.
  next(); // passing to next middleware:
});

//Mongoose pre defined methods:
userSchema.methods.isPasswordCorrect = async function (password) {
  // check password here: Bcrypt Comparision
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_Expiry,
    },
  );
};
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
    {
      _id: this._id // Only take ID
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_Expiry,
    },
  );
};
export const User = mongoose.model('User', userSchema);
