const user = require("../models/user");
const newsLetter = require("../models/newsletter");
require("dotenv").config();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const storage = multer.diskStorage({});

//Upload Setting
let upload = multer({ storage });

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    const registeredData = await user.findOne({
      email: email.toLowerCase(),
    });
    if (!registeredData) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "bookstore_user_profiles",
      });
      const newUser = new user({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        profilePicture: result.secure_url,
        publicId: result.public_id,
      });
      const registeredUser = await newUser.save();
      res.json({ success: true });
    } else if (registeredData) {
      res.json({ userExist: true });
    } else {
      res.json({ error: true });
    }
  } catch (err) {
    console.log(err);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const registeredUser = await user.findOne({
      email: email.toLowerCase(),
    });
    if (registeredUser) {
      const isMatch = await bcrypt.compare(password, registeredUser.password);
      // const isMatch = await bcrypt.compare(password, "123");
      if (isMatch) {
        const token = jwt.sign({ email }, process.env.SECRET_KEY);
        res.cookie("jwt", token, {
          expires: new Date(Date.now() + 2592000000),
          httpOnly: true,
          secure: true,
        });
        res.status(201).json({ success: true, registeredUser });
      } else {
        res.status(200).json({ invalid: "invalid credentials" });
      }
    } else {
      res.status(200).json({ invalid: "invalid credentials" });
    }
  } catch (err) {
    console.log(err);
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.json({ success: true });
  } catch (err) {
    console.log(err);
  }
};

const subscribeNewsletter = async (req, res) => {
  try {
    const { firstName, lastName, email,userId } = req.body;
    const subscriberExist = await newsLetter.findOne({
      email: email.toLowerCase(),
    });

    if (!subscriberExist) {
      const subscribeNewUser = new newsLetter({
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
        email: email.toLowerCase(),
        userId
      });
      await subscribeNewUser.save();
      res.json({ success: true });
    } else {
      res.json({ success: true });
    }
  } catch (err) {
    console.log(err);
  }
};

const userAuth = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (token) {
      const verifyUser = await jwt.verify(token, process.env.SECRET_KEY);
      const userDetails = await user.findOne({ email: verifyUser.email });
      res.json({ success: true, userDetails });
    } else {
      res.json({ error: true });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  loginUser,
  logoutUser,
  registerUser,
  subscribeNewsletter,
  userAuth,
};
