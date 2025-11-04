import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    name: String,
    slug: String,
    parent: String,
    description: String,
    avatar: String,
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    view: {
      type: Number,
      default: 0,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    // Unicode Search
    search: String,
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

const CategoryBlog = model("CategoryBlog", schema, "categories-blog");

export default CategoryBlog;
