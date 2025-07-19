import User from "./user.model.js";
import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    lastAccess: {
      type: Date,
      default: Date.now,
    },
  },
  { discriminatorKey: "role" }
);

export default User.discriminator("Admin", adminSchema);
