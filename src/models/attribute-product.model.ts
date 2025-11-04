import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    name: String,
    type: {
      type: String,
      enum: ["text", "select", "color"],
      default: "text",
    },
    options: [
      {
        label: String,
        value: String,
      },
    ],
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

const AttributeProduct = model(
  "AttributeProduct",
  schema,
  "attributes-product"
);

export default AttributeProduct;
