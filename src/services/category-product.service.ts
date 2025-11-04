import CategoryProduct from "../models/category-product.model";

class CategoryProductService {
  static async getAll({
    find = {},
    limit = 0,
    skip = 0,
    sort = {
      createdAt: -1,
    },
  }: {
    find?: Record<string, any>;
    limit?: number;
    skip?: number;
    sort?: Record<string, any>;
  }) {
    return await CategoryProduct.find(find)
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .lean();
  }

  static async getById(
    id: string,
    find: Record<string, any> = { deleted: false }
  ) {
    return await CategoryProduct.findOne({
      _id: id,
      ...find,
    }).lean();
  }

  static async create(data: any) {
    return await CategoryProduct.create(data);
  }

  static async update(id: string, data: any) {
    return await CategoryProduct.updateOne({ _id: id }, data);
  }

  static async updateMany(find: Record<string, any>, data: any) {
    return await CategoryProduct.updateMany(find, data);
  }

  static async delete(id: string) {
    return await CategoryProduct.updateOne(
      { _id: id, deleted: false },
      { deleted: true, deletedAt: Date.now() }
    );
  }

  static async restore(id: string) {
    return await CategoryProduct.updateOne({ _id: id }, { deleted: false });
  }

  static async destroy(id: string) {
    return await CategoryProduct.deleteOne({ _id: id });
  }

  static async getCountDeleted() {
    return await CategoryProduct.countDocuments({ deleted: true });
  }
}

export default CategoryProductService;
