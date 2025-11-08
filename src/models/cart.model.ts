import { model, Schema } from "mongoose";

const cartSchema = new Schema(
  {
    status: {
      type: String,
      enum: ["active", "completed", "failed", "pending"],
      default: "active",
    },
    products: {
      type: Array,
      default: [],
      require: true,
    },
    /**
    [
      {
        productId,
        quantity,
        name,
        price,
      }
    ]
   */
    countProduct: {
      type: Number,
      default: 0,
    },
    userId: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Cart = model("Cart", cartSchema, "carts");

export default Cart;
