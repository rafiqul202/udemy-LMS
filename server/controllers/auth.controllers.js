import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const registerUser = async (req, res) => {
  const { userName, userEmail, password, role } = req.body;
  const existingUser = await UserModel.findOne({
    $or: [{ userEmail }, { userName }],
  });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User name or user email already exists",
    });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({
    userName,
    userEmail,
    role,
    password: hashPassword,
  });
  await newUser.save();

  return res.status(201).json({
    success: true,
    message: "User registered successfully!",
  });
};

export const loginUser = async (req, res) => {
  const { userEmail, password } = req.body;

  const checkUser = await UserModel.findOne({ userEmail });
  if (!checkUser || !(await bcrypt.compare(password, checkUser.password))) {
    res
      .status(401)
      .json({ success: false, message: "Invalid user credential" });
    return;
  }
  const accessToken = jwt.sign(
    {
      _id: checkUser._id,
      userName: checkUser.userName,
      userEmail: checkUser.userEmail,
      role: checkUser.role,
    },
    "JWT_SECRET",
    { expiresIn: process.env.JWT_EXPIRE_IN }
  );
  res.status(200).json({
    success: true,
    message: "user login successful",
    data: {
      accessToken,
      user: {
        _id: checkUser._id,
        userName: checkUser.userName,
        userEmail: checkUser.userEmail,
        role: checkUser.role,
      },
    },
  });
};
