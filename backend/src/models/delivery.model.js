import User from "./user.model.js";
import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema({
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
});

deliverySchema.index({ currentLocation: "2dsphere" });

export default User.discriminator("Delivery", deliverySchema);
