import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["customer", "admin", "vendor", "delivery"],
      default: "customer",
    },
    avatar: {
      type: String,
      default: "",
    },
    phone: {
      type: Number,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
    discriminatorKey: "role",
  }
);

const User = mongoose.model("User", userSchema);
export default User;
