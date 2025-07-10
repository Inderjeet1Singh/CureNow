// register new user
import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ succes: false, message: "Please fill all details" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ succes: false, message: "Please provide valid email" });
    }
    if (password.length < 8) {
      return res.json({
        succes: false,
        message: "Password length must be greater than 8",
      });
    }
    // lets hash the password before save
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUserData = { name, email, password: hashPassword };
    const newUser = new userModel(newUserData);
    const user = await newUser.save();

    // lets generate new token for this user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ succes: true, token });
  } catch (error) {
    console.log(error);
    res.json({ succes: false, message: error.message });
  }
};

// login function
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        succes: false,
        message: "Please fill all details",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        succes: false,
        message: "User Not Found",
      });
    }
    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) {
      return res.json({ succes: false, message: "Invalid Credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ succes: true, token });
  } catch (error) {
    console.log(error);
    res.json({ succes: false, message: error.message });
  }
};
// user Profile

const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const userData = await userModel.findById(userId).select("-password");
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }
    res.json({ succes: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ succes: false, message: error.message });
  }
};

// update user profile
const updateProfile = async (req, res) => {
  try {
    const { name, address, dob, gender } = req.body;
    const userId = req.userId;
    const imageFile = req.file;
    if (!name || !address || !dob || !gender) {
      return res.json({ succes: false, message: "Fill All Details" });
    }
    await userModel.findByIdAndUpdate(userId, {
      name,
      address: JSON.parse(address),
      dob,
      gender,
    });
    if (imageFile) {
      // lets save in cloudinary
      const uploadimg = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });

      const imageUrl = uploadimg.secure_url;
      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
    }

    res.json({ succes: true, message: "Profile Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ succes: false, message: error.message });
  }
};
export { registerUser, loginUser, getUserProfile, updateProfile };
