import User from "./user.model.js";
import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  addresses: [
    {
      street: String,
      city: String,
      state: String,
      country: String,
      postalCode: String,
      isDefault: Boolean,
      addressType: String,
    },
  ],
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],

  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
  },

  orderHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

export default User.discriminator('Customer', customerSchema)
