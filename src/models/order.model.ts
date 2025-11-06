import { model, Schema } from "mongoose";

const orderItemSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 }, // Giá tại thời điểm đặt hàng
    quantity: { type: Number, required: true, min: 1 },
    // Lưu các biến thể (ví dụ: { color: 'Red', size: 'L' })
    variant: { type: Schema.Types.Mixed, required: false },
  },
  { _id: false }
);

const shippingAddressSchema = new Schema(
  {
    fullName: { type: String, required: true },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    ward: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    items: {
      type: [orderItemSchema],
      required: true,
      default: [],
    },
    shippingAddress: {
      type: Schema.Types.ObjectId,
      ref: "UserAddress",
      required: true,
    },
    paymentMethod: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    shippingFee: {
      type: Number,
      default: 0,
    },
    tax: {
      type: Number,
      default: 0,
    },
    subtotal: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
      default: 0,
    },
    note: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Order = model("Order", orderSchema, "orders-demo");

export default Order;
