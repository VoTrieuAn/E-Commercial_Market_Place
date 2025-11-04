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
      type: Number,
      require: true,
    },
  },
  {
    collection: "carts-demo",
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Cart = model("Cart", cartSchema, "carts-demo");

export default Cart;
