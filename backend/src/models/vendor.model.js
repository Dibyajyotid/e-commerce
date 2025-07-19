import User from "./user.model.js";
import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true,
  },
  businessRegistrationNumber: {
    type: String,
    required: true,
  },
  taxID: {
    type: String,
    required: true,
  },
  businessAddress: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
  },
  businessPhone: {
    type: String,
    required: true,
  },
  businessEmail: {
    type: String,
    required: true,
  },
  bankDetails: {
    accountName: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: Number,
      required: true,
    },
    bankName: {
      type: String,
      required: true,
    },
    branchCode: {
      type: String,
      required: true,
    },
  },
  approved: {
    type: Boolean,
  },
  approvalDate: {
    type: Date,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

export default User.discriminator("Vendor", vendorSchema);
