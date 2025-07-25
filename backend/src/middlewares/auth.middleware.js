import { verifyToken } from "../lib/utils.js";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized, no token provided" });
    }

    const decoded = verifyToken(token);
    if (!decoded || !decoded.userId) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized, token failed" });
    }

    //find user by ID from token and attach to request
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    //clear invalid token cookie
    clearTokenCookie(res);
    console.error("Error in protectRoute middleware:", error.message);
    res
      .status(401)
      .json({ success: false, message: "Not authorized, token failed" });
  }
};
