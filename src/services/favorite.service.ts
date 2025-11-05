import { NotFoundError } from "../core/error.response";
import Favorite from "../models/favorite.model";
import ProductService from "./product.service";

class FavoriteService {
  static async getFavoriteByUserId(
    userId: string,
    option: Record<string, any> = {
      limit: 20,
      skip: 0,
      sort: { position: -1 },
    }
  ) {
    const { skip, limit, sort } = option;
    const favorites = await Favorite.find({
      userId,
    })
      .populate(
        "productId",
        "name position images priceOld priceNew stock description view"
      )
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();
    // 2. Xử lý hậu kỳ: map qua mảng kết quả để đổi tên trường
    return favorites.map((favorite) => {
      // Đổi tên trường:
      // a) Gán giá trị của favorite.productId sang favorite.product
      (favorite as any).product = favorite.productId;

      // b) Xóa trường favorite.productId cũ
      delete favorite.productId;

      return favorite;
    });
  }

  static async favorite(userId: string, productId: string) {
    const product = await ProductService.getById(productId, {
      deleted: false,
      status: "active",
    });

    if (!product) {
      throw new NotFoundError("Sản phẩm không tồn tại!");
    }

    return await Favorite.findOneAndUpdate(
      {
        userId,
        productId,
      },
      {
        userId,
        productId,
      },
      {
        upsert: true,
        new: true,
      }
    ).lean();
  }

  static async unFavorite(userId: string, productId: string) {
    const [product, favorite] = await Promise.all([
      ProductService.getById(productId, {
        deleted: false,
        status: "active",
      }),
      Favorite.findOne({
        userId,
        productId,
      }).lean(),
    ]);

    if (!product) {
      throw new NotFoundError("Sản phẩm không tồn tại!");
    }

    if (!favorite) {
      throw new NotFoundError("Yêu thích không tồn tại!");
    }

    return await Favorite.deleteOne({
      userId,
      productId,
    });
  }
}

export default FavoriteService;
