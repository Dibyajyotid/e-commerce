import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      unique: true,
    },

    password: {
      type: String,
      required: true,
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
      enum: [
        "twp-wheeler with gear",
        "twp-wheeler without gear",
        "four-wheeler",
      ],
      required: true,
    },

    licensePlate: {
      type: String,
      required: true,
    },

    drivingLicenseNumber: {
      type: String,
      required: true,
    },

    drivingLicenseType: {
      type: String,
      enum: ["MCWOG", "MCWG", "LMV"],
      default: "LMV",
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

    lastActive: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

deliverySchema.index({ currentLocation: "2dsphere" });

const Delivery = mongoose.model("Delivery", deliverySchema);

export default Delivery;
