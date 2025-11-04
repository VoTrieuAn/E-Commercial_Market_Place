import Blog from "../models/blog.model";

class ArticleService {
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
    return Blog.find(find).sort(sort).limit(limit).skip(skip).lean();
  };

  static getById = async (
    id: string,
    find: Record<string, any> = { deleted: false }
  ) => {
    const article = await Blog.findOne({
      _id: id,
      ...find,
    }).lean();

    return article;
  };

  static create = async (data: any) => {
    if (data.status === "published") {
      data.publishedAt = Date.now();
    }

    const result = await Blog.create(data);

    return result;
  };

  static update = async (id: string, data: any) => {
    const article = this.getById(id);

    if (!article) {
      return null;
    }

    if (data.status === "published") {
      data.publishedAt = Date.now();
    }

    const result = await Blog.updateOne(
      {
        _id: id,
        deleted: false,
      },
      data
    );
    return result;
  };

  static delete = async (id: string) => {
    const result = await Blog.updateOne(
      {
        _id: id,
        deleted: false,
      },
      {
        deleted: true,
        deletedAt: Date.now(),
      }
    );

    return result;
  };

  static async getCountDeleted() {
    return await Blog.countDocuments({ deleted: true });
  }
}

export default ArticleService;
