import { User } from "../models/User.js";


export const createUser = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  const user = await User.create(userData);
  return user;
};

export const findUserByEmail = async (email, includePassword = false) => {
  const query = User.findOne({ email });
  if (includePassword) query.select("+password"); // because select: false in schema
  return await query;
};


export const findUserById = async (userId) => {
  return await User.findById(userId);
};

export const validateUserLogin = async (email, password) => {
  const user = await findUserByEmail(email, true);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  return user;
};

