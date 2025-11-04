import Product from "../models/product.model";

class ProductService {
  static async getAll({
    find = {},
    limit = 0,
    skip = 0,
    sort = { createdAt: -1 },
  }: {
    find?: Record<string, any>;
    limit?: number;
    skip?: number;
    sort?: Record<string, any>;
  }) {
    return await Product.find(find).sort(sort).limit(limit).skip(skip).lean();
  }
}

export default ProductService;
