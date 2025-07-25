import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1,
  },
  priceAtAddition: {
    // Snapshot of price when added
    type: Number,
    required: true,
  },
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // One cart per user
    },
    items: [cartItemSchema],
    totalAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

// Auto-update updatedAt on changes
cartSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
