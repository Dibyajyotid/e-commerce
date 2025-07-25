import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    images: [
      {
        type: String,
        required: true,
      },
    ],

    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },

    ratings: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        score: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        comment: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    tags: [
      {
        type: String,
      },
    ],

    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    sku: {
      type: String,
      unique: true,
      required: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isNewArrival: {
      type: Boolean,
      default: false,
    },

    isOnSale: {
      type: Boolean,
      default: false,
    },

    saleEndDate: {
      type: Date,
    },

    warranty: {
      type: String,
      default: "No warranty",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
