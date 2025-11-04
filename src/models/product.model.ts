import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    name: String,
    slug: String,
    position: Number, // vị trí sắp xếp
    category: [String],
    images: [String],
    priceOld: Number,
    priceNew: Number,
    stock: Number,
    attributes: Array,
    variants: Array,
    description: String,
    content: String,
    status: {
      type: String,
      // draft: bản nháp, active: kích hoạt, inactive: không kích hoạt
      enum: ["draft", "active", "inactive"],
      default: "draft",
    },
    view: {
      type: Number,
      default: 0,
    },
    search: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

const Product = model("Product", schema, "products");

export default Product;
