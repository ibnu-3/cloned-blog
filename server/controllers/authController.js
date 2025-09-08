import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import 'dotenv/config'

const generateToken = (id) => {
  return jwt.sign({ id }, "jwt", { expiresIn: "7d" });
};

export const registerUser = async (req, res) => {
  const { name, email, password,image, inviteToken } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
     return res.status(400).json({ message: "user already exists" });
    }
    let role ='member'
    if(inviteToken && inviteToken == process.env.ADMIN_INVITE_TOKEN){
         role ='admin';
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword ,image, role});
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image:user.image,
      role:user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
    console.log(error.message);
  }
};

//login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image:user.image,
      role:user.role,
      token: generateToken(user._id),
      });
    } else {
      return res.status(404).json({ message: "Invalid credetials" });
    }
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
    console.log(error.message);
  }
};
