import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import Customer from "../models/customer.model.js";
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

    //create customer profile
    const customer = new Customer({
      _id: newUser._id, // ensure the customer profile has the same ID as the user
      ...newUser.toObject(), // copy user fields to customer
      addresses: [],
      wishlist: [],
      orderHistory: [],
      cart: null,
    });

    await customer.save();
    generateToken(res, customer._id, customer.role);
    res.status(201).json({
      message: "Customer registered successfully",
      customer: {
        id: customer._id,
        fullName: customer.fullName,
        email: customer.email,
        phone: customer.phone,
        role: customer.role,
        isActive: customer.isActive,
        emailVerified: customer.emailVerified,
        avatar: customer.avatar,
        createdAt: customer.createdAt,
        updatedAt: customer.updatedAt,
        lastLogin: customer.lastLogin,
        addresses: customer.addresses,
        wishlist: customer.wishlist,
        cart: customer.cart,
        orderHistory: customer.orderHistory,
      },
    });
  } catch (error) {}
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
