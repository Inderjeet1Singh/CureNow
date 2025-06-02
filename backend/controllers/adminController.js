import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
// adding doctor

// first we add loginAdmin function

const loginAdmin = (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ succes: false, message: "enter all data" });
    }
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASS
    ) {
      return res.json({ succes: false, message: "Invalid Credentials" });
    }
    const token = jwt.sign(email + password, process.env.JWT_SECRET);
    return res.json({ succes: true, token });
  } catch (error) {
    console.log(error);
    return res.json({ succes: false, message: error.message });
  }
};
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      about,
      fees,
      degree,
      experience,
      address,
    } = req.body;
    const imageFile = req.file;
    // console.log({
    //   name,
    //   email,
    //   password,
    //   speciality,
    //   about,
    //   fees,
    //   degree,
    //   experience,
    //   address,
    //   imageFile,
    // });
    // any thing is missing
    if (
      !name ||
      !email ||
      !speciality ||
      !degree ||
      !password ||
      !experience ||
      !fees ||
      !about ||
      !address
    ) {
      return res.json({ succes: false, message: "Fill All Details" });
    }
    // email is valid or not
    if (!validator.isEmail(email)) {
      return res.json({ succes: false, message: "Enter valid email address" });
    }

    if (password.length < 8) {
      return res.json({
        succes: false,
        message: "Password must have minimum 8 characters",
      });
    }
    // let encrypt the password

    const salt = await bcrypt.genSalt(10);
    const encryptPass = await bcrypt.hash(password, salt);

    // upload the image on cloudinary
    const imageUplaod = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUplaod.secure_url;
    console.log(imageUrl);
    // store the data in the database
    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: encryptPass,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),

      date: Date.now(),
    };

    const newDoc = new doctorModel(doctorData);
    await newDoc.save();
    return res.json({ succes: true, message: "Doctor Added Successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ succes: false, message: error.message });
  }
};

export { addDoctor, loginAdmin };
