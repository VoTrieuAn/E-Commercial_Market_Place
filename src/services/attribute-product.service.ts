import AttributeProduct from "../models/attribute-product.model";

class AttributeProductService {
  static async getAll({
    find = {},
    limit = 0,
    skip = 0,
  }: {
    find?: Record<string, any>;
    limit?: number;
    skip?: number;
  }) {
    return await AttributeProduct.find(find).limit(limit).skip(skip).lean();
  }

  static async getById(
    id: string,
    find: Record<string, any> = { deleted: false }
  ) {
    return await AttributeProduct.findOne({
      _id: id,
      ...find,
    }).lean();
  }

  static async create(data: any) {
    return await AttributeProduct.create(data);
  }

  static async update(id: string, data: any) {
    return await AttributeProduct.updateOne(
      {
        _id: id,
        deleted: false,
      },
      data
    );
  }

  static async delete(id: string) {
    return await AttributeProduct.updateOne(
      {
        _id: id,
        deleted: false,
      },
      { deleted: true, deletedAt: Date.now() }
    );
  }

  static async getCountDeleted() {
    return await AttributeProduct.countDocuments({ deleted: true });
  }
}

export default AttributeProductService;
