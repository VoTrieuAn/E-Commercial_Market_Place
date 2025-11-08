import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    orderId: { type: Schema.Types.ObjectId, ref: "Order" },
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
    rating: { type: Number, required: true, min: 1, max: 5 },
    emotion: {
      type: String,
      enum: ["sad", "neutral", "happy"],
      default: "happy", // hoặc remove default nếu muốn rỗng
    },
    comment: { type: String, default: "" },
    images: { type: [String], default: [] },
    updated: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Feedback = model("Feedback", schema, "feedbacks");

export default Feedback;
