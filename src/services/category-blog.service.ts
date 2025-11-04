import CategoryBlog from "../models/category-blog.model";

class CategoryBlogService {
  static getById = async (
    id: string,
    find: Record<string, any> = { deleted: false }
  ) => {
    const categoryBlog = await CategoryBlog.findOne({
      _id: id,
      ...find,
    }).lean();

    return categoryBlog;
  };

  static getAll = async ({
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
  }) => {
    return await CategoryBlog.find(find)
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .lean();
  };

  static create = async (data: any) => {
    return await CategoryBlog.create(data);
  };

  // Update
  static update = async (id: string, data: any) => {
    const categoryBlog = this.getById(id);

    if (!categoryBlog) {
      return null;
    }

    const result = await CategoryBlog.updateOne(
      {
        _id: id,
        deleted: false,
      },
      data
    );

    return result;
  };

  static async updateMany(find: Record<string, any>, data: any) {
    return await CategoryBlog.updateMany(find, data);
  }

  static delete = async (id: string) => {
    return await CategoryBlog.updateOne(
      {
        _id: id,
        deleted: false,
      },
      {
        deleted: true,
        deletedAt: Date.now(),
      }
    );
  };

  static restore = async (id: string) => {
    const categoryBlog = this.getById(id, { deleted: true });

    if (!categoryBlog) {
      return null;
    }
    const result = await CategoryBlog.updateOne(
      {
        _id: id,
      },
      {
        deleted: false,
      }
    );
    return result;
  };

  static destroy = async (id: string) => {
    const categoryBlog = this.getById(id, { deleted: true });
    if (!categoryBlog) {
      return null;
    }
    const result = await CategoryBlog.deleteOne({
      _id: id,
    });
    return result;
  };

  static async getCountDeleted() {
    return await CategoryBlog.countDocuments({ deleted: true });
  }
}

export default CategoryBlogService;
