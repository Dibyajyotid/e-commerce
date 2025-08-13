import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import Vendor from "../models/vendor.model.js";
import {
  clearTokenCookie,
  generateDeliveryToken,
  generateUserToken,
  generateVendorToken,
} from "../lib/utils.js";
import Delivery from "../models/delivery.model.js";

//customer auth
export const customerSignup = async (req, res) => {
  const { email, password, firstName, lastName, phone } = req.body;

  console.log("Signup request received:", req.body);

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

      //this was showing error because generateToken expects a user object but i am only giving individual fields
      generateUserToken(newUser, res); //now it is fixed

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

    console.log("Login request received:", req.body); //debugging log

    const user = await User.findOne({ email });
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

    generateUserToken(updatedUser, res);

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

export const checkUserAuth = (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }

    const user = {
      id: req.user._id,
      fullName: req.user.fullName,
      email: req.user.email,
      phone: req.user.phone,
      role: req.user.role,
      avatar: req.user.avatar,
      isActive: req.user.isActive,
      emailVerified: req.user.emailVerified,
      lastLogin: req.user.lastLogin,
      addresses: req.user.addresses,
      wishlist: req.user.wishlist,
      cart: req.user.cart,
      orderHistory: req.user.orderHistory,
      lastAccess: req.user.lastAccess,
    };

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//vendor auth
export const vendorSignup = async (req, res) => {
  const { email, password, businessName } = req.body;
  console.log(req.body);

  try {
    if (!email || !password || !businessName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({
        success: false,
        message: "vendor already exists please Login",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newVendor = new Vendor({
      email,
      password: hashedPassword,
      businessName,
    });

    if (newVendor) {
      await newVendor.save();

      generateVendorToken(newVendor, res);

      const vendor = {
        id: newVendor._id,
        email: newVendor.email,
        businessName: newVendor.businessName,
        businessLogo: newVendor.businessLogo,
        businessRegistrationNumber: newVendor.businessRegistrationNumber,
        taxID: newVendor.taxID,
        businessAddress: newVendor.businessAddress,
        businessPhone: newVendor.businessPhone,
        businessEmail: newVendor.businessEmail,
        bankingDetails: newVendor.bankingDetails,
        approved: newVendor.approved,
        approvalDate: newVendor.approvalDate,
        products: newVendor.products,
        lastAccess: newVendor.lastAccess,
      };

      res.status(201).json({
        success: true,
        message: "Vendor registered successfully",
        vendor,
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid Vendor Data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const vendorLogin = async (req, res) => {
  const { email, password, businessName } = req.body;

  try {
    if (!email || !password || !businessName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const vendor = await Vendor.findOne({ email });
    if (!vendor) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, Vendor.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const updatedVendor = await Vendor.findByIdAndUpdate(
      vendor._id,
      { $set: { lastAccess: new Date() } },
      { new: true }
    ).select("-password");

    generateVendorToken(updatedVendor, res);

    const vendorData = {
      id: updatedVendor._id,
      email: updatedVendor.email,
      businessName: updatedVendor.businessName,
      businessLogo: updatedVendor.businessLogo,
      businessRegistrationNumber: updatedVendor.businessRegistrationNumber,
      businessAddress: updatedVendor.businessAddress,
    };

    res.status(201).json({
      success: true,
      message: "Vendor loggedIn successfully",
      vendorData,
    });
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const vendorLogout = async (req, res) => {
  try {
    clearTokenCookie(res);
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const checkVendorAuth = (req, res) => {
  try {
    if (!req.vendor) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }

    const vendor = {
      id: req.vendor._id,
      email: req.vendor.email,
      businessName: req.vendor.businessName,
      businessLogo: req.vendor.businessLogo,
      businessRegistrationNumber: req.vendor.businessRegistrationNumber,
      taxID: req.vendor.taxID,
      businessAddress: req.vendor.businessAddress,
      businessPhone: req.vendor.businessPhone,
      businessEmail: req.vendor.businessEmail,
      bankingDetails: req.vendor.bankingDetails,
      approved: req.vendor.approved,
      approvalDate: req.vendor.approvalDate,
      products: req.vendor.products,
      lastAccess: req.vendor.lastAccess,
    };

    res.status(200).json({ success: true, vendor });
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//delivery auth
export const deliverySignup = async (req, res) => {
  const {
    firstName,
    lastName,
    password,
    vehicleType,
    licensePlate,
    drivingLicenseNumber,
    drivingLicenseType,
  } = req.body;

  try {
    if (
      !firstName ||
      !lastName ||
      !password ||
      !vehicleType ||
      !licensePlate ||
      !drivingLicenseNumber ||
      !drivingLicenseType
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!/^[a-zA-Z]+$/.test(firstName) || !/^[a-zA-Z]+$/.test(lastName)) {
      return res.status(400).json({ message: "Invalid name format" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const existingdelivery = await Delivery.findOne({ drivingLicenseNumber });
    if (existingdelivery) {
      return res.status(400).json({
        success: false,
        message: "delivery already exists please Login",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newdelivery = new Delivery({
      fullName: `${firstName} ${lastName}`,
      password: hashedPassword,
      vehicleType,
      licensePlate,
      drivingLicenseNumber,
      drivingLicenseType,
    });

    if (newdelivery) {
      await newdelivery.save();

      generateDeliveryToken(newdelivery, res);

      const delivery = {
        id: newdelivery._id,
        email: newdelivery.email,
        fullName: newdelivery.fullName,
        vehicleType: newdelivery.vehicleType,
        licensePlate: newdelivery.licensePlate,
        drivingLicenseNumber: newdelivery.drivingLicenseNumber,
        drivingLicenseType: newdelivery.drivingLicenseType,
        avatar: newdelivery.avatar,
        phone: newdelivery.phone,
        currentLocation: newdelivery.currentLocation,
        availability: newdelivery.availability,
        lastActive: newdelivery.lastActive,
        assignedOrders: newdelivery.assignedOrders,
        completedOrders: newdelivery.completedOrders,
        ratings: newdelivery.ratings,
      };

      res.status(201).json({
        success: true,
        message: "delivery registered successfully",
        delivery,
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Invalid delivery Data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deliveryLogin = async (req, res) => {
  const { drivingLicenseNumber, password } = req.body;

  try {
    if (!drivingLicenseNumber || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const delivery = await Delivery.findOne({ drivingLicenseNumber });
    if (!delivery) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, Delivery.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const updatedDelivery = await Delivery.findByIdAndUpdate(
      updatedDelivery._id,
      { $set: { lastActive: new Date() } },
      { new: true }
    ).select("-password");

    generateDeliveryToken(updatedDelivery, res);

    const deliveryData = {
      id: updatedDelivery._id,
      email: updatedDelivery.email,
      fullName: updatedDelivery.fullName,
      vehicleType: updatedDelivery.vehicleType,
      licensePlate: updatedDelivery.licensePlate,
      drivingLicenseNumber: updatedDelivery.drivingLicenseNumber,
      drivingLicenseType: updatedDelivery.drivingLicenseType,
      avatar: updatedDelivery.avatar,
      phone: updatedDelivery.phone,
      currentLocation: updatedDelivery.currentLocation,
      availability: updatedDelivery.availability,
      lastActive: updatedDelivery.lastActive,
      assignedOrders: updatedDelivery.assignedOrders,
      completedOrders: updatedDelivery.completedOrders,
      ratings: updatedDelivery.ratings,
    };

    res.status(201).json({
      success: true,
      message: "Delivery loggedIn successfully",
      deliveryData,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deliveryLogout = async (req, res) => {
  try {
    clearTokenCookie(res);
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const checkDeliveryAuth = (req, res) => {
  try {
    if (!req.delivery) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }

    const delivery = {
      id: req.delivery._id,
      email: req.delivery.email,
      fullName: req.delivery.fullName,
      vehicleType: req.delivery.vehicleType,
      licensePlate: req.delivery.licensePlate,
      drivingLicenseNumber: req.delivery.drivingLicenseNumber,
      drivingLicenseType: req.delivery.drivingLicenseType,
      avatar: req.delivery.avatar,
      phone: req.delivery.phone,
      currentLocation: req.delivery.currentLocation,
      availability: req.delivery.availability,
      lastActive: req.delivery.lastActive,
      assignedOrders: req.delivery.assignedOrders,
      completedOrders: req.delivery.completedOrders,
      ratings: req.delivery.ratings,
    };

    res.status(200).json({ success: true, delivery });
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
