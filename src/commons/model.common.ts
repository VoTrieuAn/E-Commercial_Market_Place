import AttributeProduct from "../models/attribute-product.model";
import Blog from "../models/blog.model";
import CategoryBlog from "../models/category-blog.model";
import CategoryProduct from "../models/category-product.model";
import Order from "../models/order.model";
import Product from "../models/product.model";
import Voucher from "../models/voucher.model";

const models: Record<string, any> = {
  Product,
  CategoryProduct,
  AttributeProduct,
  CategoryBlog,
  Blog,
  Order,
  Voucher,
};

export default models;
