import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    businessName: {
      type: String,
      required: true,
    },

    businessLogo: {
      type: String,
      default: "",
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
      default: false,
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

    lastAccess: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Vendor = mongoose.model("Vendor", vendorSchema);
export default Vendor;
