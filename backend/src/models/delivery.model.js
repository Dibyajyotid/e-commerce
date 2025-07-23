import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema(
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
      enum: ["customer", "admin"],
      default: "customer",
    },

    avatar: {
      type: String,
      default: "",
    },

    phone: {
      type: Number,
    },

    vehicleType: {
      type: String,
      required: true,
    },

    licensePlate: {
      type: String,
      required: true,
    },

    licenseNumber: {
      type: String,
      required: true,
    },

    currentLocation: {
      type: {
        type: String,
        default: "Point",
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },

    availability: {
      type: Boolean,
      default: true,
    },

    assignedOrders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],

    completedOrders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],

    ratings: [
      {
        score: Number,
        comment: String,
        orderId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Order",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

deliverySchema.index({ currentLocation: "2dsphere" });

const Delivery = mongoose.model("Delivery", deliverySchema);

export default Delivery;
