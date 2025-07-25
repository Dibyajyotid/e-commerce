import jwt from "jsonwebtoken";
import { config } from "dotenv";

// Generates a JWT token for the user and sets it as a cookie in the response
// user: User object containing _id and role
export const generateToken = (user, res) => {
  config();
  if (!user?._id || !user?.role || !user) {
    throw new Error("Invalid user data for token generation");
  }

  const payload = {
    userId: user._id,
    userEmail: user.email,
    userFullName: user.fullName,
    role: user.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d", // Token valid for 7 days
  });

  // Set cookie options
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in millisecond
    secure: process.env.NODE_ENV === "production",
    domain: process.env.COOKIE_DOMAIN || "localhost",
    path: "/",
    sameSite: "None", // Allow cross-site cookies
  };

  res.cookie("token", token, cookieOptions);
  return token;
};

//verifies JWT token from cookie/header
export const verifyToken = (token) => {
  if (!token) {
    throw new Error("No token provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Validate required fields in payload
    if (!decoded.userId || !decoded.role) {
      throw new Error("Invalid token payload");
    }

    return decoded;
  } catch (error) {
    throw new Error(
      error.name === "TokenExpiredError" ? "Token expired" : "Invalid token"
    );
  }
};

//clears the JWT token by setting an expired cookie
export const clearTokenCookie = (res) => {
  res.clearCookie("token", {
    domain: process.env.COOKIE_DOMAIN || "localhost",
    path: "/",
    httpOnly: true,
    sameSite: "None",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0, // Set maxAge to 0 to expire the cookie immediately
  });
};
