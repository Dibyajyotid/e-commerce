import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  priceAtPurchase: {
    // Price snapshot
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [orderItemSchema],
    orderDate: {
      type: Date,
      default: Date.now,
    },
    isCancelled: {
      type: Boolean,
      default: false,
    },
    shippingAddress: {
      street: String,
      city: String,
      state: String,
      country: String,
      postalCode: String,
    },
    paymentMethod: {
      type: String,
      enum: ["credit_card", "paypal", "bank_transfer"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: ["processing", "shipped", "delivered", "cancelled"],
      default: "processing",
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    taxAmount: Number,
    shippingFee: Number,
    delivery: {
      // Only for delivery role
      type: mongoose.Schema.Types.ObjectId,
      ref: "Delivery",
    },
    vendor: {
      // For vendor tracking
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
    },
  },
  { timestamps: true }
);

// Indexes for faster queries
orderSchema.index({ user: 1 });
orderSchema.index({ vendor: 1 });
orderSchema.index({ delivery: 1 });
orderSchema.index({ createdAt: -1 }); // Sort by newest

const Order = mongoose.model("Order", orderSchema);

export default Order;
