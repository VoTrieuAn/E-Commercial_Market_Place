import AttributeProduct from "../models/attribute-product.model";
import Blog from "../models/blog.model";
import CategoryBlog from "../models/category-blog.model";
import CategoryProduct from "../models/category-product.model";
import Product from "../models/product.model";

const models: Record<string, any> = {
  Product,
  CategoryProduct,
  AttributeProduct,
  CategoryBlog,
  Blog,
};

export default models;
