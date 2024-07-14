import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const isAuthorized = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(400).json({
        message: "No token provided, Access Denied!",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;

    next();
  } catch (error) {
    console.log(error.message);
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const isAlreadyUser = await User.findOne({ email });

    if (isAlreadyUser) {
      return res
        .status(400)
        .json({ success: false, message: "This email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    const createdUser = await user.save();

    return res.status(201).json({
      success: true,
      message: "user registered successfully",
      createdUser,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isUser = await User.findOne({ email });

    if (!isUser) {
      return res
        .status(400)
        .json({ success: false, message: "This email is not registered" });
    }

    const isPasswordMatch = bcrypt.compare(isUser.password, password);

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Your password is incorrect" });
    }
    const token = jwt.sign(
      {
        _id: isUser._id,
      },
      process.env.JWT_SECRET
    );

    return res
      .cookie("token", token, { httpOnly: true, expiresIn: "1h" })
      .status(200)
      .json({ success: true, message: "Logged In successfully", isUser });
  } catch (error) {
    console.log(error.message);
  }
};

export const logoutUser = async (_, res) => {
  try {
    res
      .cookie("token", "", { expiresIn: new Date(0), httpOnly: true })
      .status(200)
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

export const userProfile = async (req, res) => {
  const token = req.cookies.token;
  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { _id, email, name } = await User.findById(decoded._id);
    return res.status(200).json({ name, email, _id });
  }
  return res.status(404).json(null);
};
