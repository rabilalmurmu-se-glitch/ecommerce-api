import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

const JWT_SECRET = config.jwt.secret;
const JWT_EXPIRES_IN = config.jwt.expire;

export const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};
