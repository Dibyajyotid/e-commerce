import {
  verifyDeliveryToken,
  verifyUserToken,
  verifyVendorToken,
} from "../lib/utils.js";
import Delivery from "../models/delivery.model.js";
import User from "../models/user.model.js";
import Vendor from "../models/vendor.model.js";

export const protectUserRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized, no token provided" });
    }

    const decoded = verifyUserToken(token);
    if (!decoded?.userId) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized, token failed" });
    }

    //find user by ID from token and attach to request
    const user = await User.findById(decoded.userId).select("-password");
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

export const protectVendorRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized, no token provided" });
    }

    const decoded = verifyVendorToken(token);
    if (!decoded?.vendorId) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized, token failed" });
    }

    //find user by ID from token and attach to request
    const vendor = await Vendor.findById(decoded.vendorId).select("-password");
    if (!vendor) {
      return res
        .status(404)
        .json({ success: false, message: "Vendor not found" });
    }
    req.vendor = vendor;
    next();
  } catch (error) {
    //clear invalid token cookie
    clearTokenCookie(res);
    console.error("Error in protectVendorRoute middleware:", error.message);
    res
      .status(401)
      .json({ success: false, message: "Not authorized, token failed" });
  }
};

export const protectDeliveryRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized, no token provided" });
    }

    const decoded = verifyDeliveryToken(token);
    if (!decoded?.deliveryId) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized, token failed" });
    }

    //find user by ID from token and attach to request
    const delivery = await Delivery.findById(decoded.deliveryId).select(
      "-password"
    );
    if (!delivery) {
      return res
        .status(404)
        .json({ success: false, message: "delivery not found" });
    }
    req.delivery = delivery;
    next();
  } catch (error) {
    //clear invalid token cookie
    clearTokenCookie(res);
    console.error("Error in protectDeliveryRoute middleware:", error.message);
    res
      .status(401)
      .json({ success: false, message: "Not authorized, token failed" });
  }
};
//   try {
//     const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Not authorized, no token provided" });
//     }

//     const decoded = verifyUserToken(token);
//     if (!decoded?.userId) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Not authorized, token failed" });
//     }

//     //find user by ID from token and attach to request
//     const user = await User.findById(decoded.userId).select("-password");
//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }
//     req.user = user;
//     next();
//   } catch (error) {
//     //clear invalid token cookie
//     clearTokenCookie(res);
//     console.error("Error in protectRoute middleware:", error.message);
//     res
//       .status(401)
//       .json({ success: false, message: "Not authorized, token failed" });
//   }
// };
