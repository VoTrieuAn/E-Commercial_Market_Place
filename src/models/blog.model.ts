import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    name: String,
    slug: String,
    category: {
      type: [String],
      ref: "BlogCategory",
    },
    avatar: String,
    description: String,
    content: String,
    status: {
      type: String,
      // draft - Bản nháp, published - Đã xuất bản, archived - Lưu trữ
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    view: {
      type: Number,
      default: 0,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    search: String,
    publishedAt: Date,
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

const Blog = model("Blog", schema, "blogs");

export default Blog;
