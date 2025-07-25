import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import Customer from "../models/newUser.model.js";
import { generateToken } from "../lib/utils.js";

//customer auth
export const customerSignup = async (req, res) => {
  const { email, password, firstName, lastName, phone } = req.body;

  try {
    if (!email || !password || !firstName || !lastName || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //checking for valid input formats for names
    if (!/^[a-zA-Z]+$/.test(firstName) || !/^[a-zA-Z]+$/.test(lastName)) {
      return res.status(400).json({ message: "Invalid name format" });
    }

    //checking for valid input formats for phone
    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({ message: "Invalid phone number format" });
    }

    //cheking for length of password
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    //checking for valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //creating the base user object
    const newUser = new User({
      fullName: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
      phone,
      role: "customer",
    });

    if (newUser) {
      await newUser.save();
      generateToken(res, newUser._id, newUser.role);

      const customer = {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        avatar: newUser.avatar,
        isActive: newUser.isActive,
        emailVerified: newUser.emailVerified,
        lastLogin: newUser.lastLogin,
        addresses: newUser.addresses,
        wishlist: newUser.wishlist,
        cart: newUser.cart,
        orderHistory: newUser.orderHistory,
        lastAccess: newUser.lastAccess,
      };

      res.status(201).json({
        success: true,
        message: "Customer registered successfully",
        customer,
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid User Data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const customerLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.find({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $set: { lastAccess: new Date() } },
      { new: true }
    ).select("-password");

    generateToken(res, updatedUser._id, updatedUser.role);

    const customer = {
      id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      phone: updatedUser.phone,
      role: updatedUser.role,
      avatar: updatedUser.avatar,
      isActive: updatedUser.isActive,
      emailVerified: updatedUser.emailVerified,
      lastLogin: updatedUser.lastLogin,
      addresses: updatedUser.addresses,
      wishlist: updatedUser.wishlist,
      cart: updatedUser.cart,
      orderHistory: updatedUser.orderHistory,
      lastAccess: updatedUser.lastAccess,
    };

    res.status(201).json({
      success: true,
      message: "Customer loggedIn successfully",
      customer,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const customerLogout = async (req, res) => {
  try {
    clearTokenCookie(res);
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//vendor auth
export const vendorSignup = async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    businessName,
    businessAddress,
    businessType,
    businessLicenseNumber,
    businessPhone,
    businessEmail,
    bankDetails,
  } = req.body;
};
