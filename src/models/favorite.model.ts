import { model, Schema } from "mongoose";

const schemaFavorite = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  {
    timestamps: true,
  }
);

const Favorite = model("Favorite", schemaFavorite, "favorites-demo");

export default Favorite;
