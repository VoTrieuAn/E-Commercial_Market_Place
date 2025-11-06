"use strict";

import { NotFoundError } from "../core/error.response";
import Cart from "../models/cart.model";
import ProductService from "./product.service";
import UserService from "./user.service";
// import cartSchema from "../models/schemas/cart.schema";
// import { findProductById } from "../models/repositories/product.repo";
// import { NotFoundError } from "../core/error.response";

/**
 * Key features: Cart Service
 * - Add product quantity by one [user]
 * - Increase product quantity by one [user]
 * - Get cart products [user]
 * - Remove cart item [user]
 * - Delete cart [user]
 */

class CartService {
  // private static async createCart({
  //   userId,
  //   product = {},
  // }: {
  //   userId: string;
  //   product: any;
  // }) {
  //   const query = {
  //       userId: userId,
  //       status: "active",
  //     },
  //     updateOrInsert = {
  //       $addToSet: {
  //         products: product,
  //       },
  //       countProduct: product.quantity || 1,
  //     },
  //     options = {
  //       // Update the document if it exists
  //       upsert: true,
  //       // Create the document if it doesn't exist
  //       new: true,
  //     };
  //   return await Cart.findOneAndUpdate(query, updateOrInsert, options).lean();
  // }

  private static async createCart({
    userId,
    product = {},
  }: {
    userId: string;
    product: any;
  }) {
    // ensure variantKey stored on product
    product.variantKey = this.generateVariantKey(product.variant);

    const query = {
        userId: userId,
        status: "active",
      },
      updateOrInsert = {
        $push: {
          products: product,
        },
        $inc: {
          countProduct: 1,
        },
      },
      options = {
        upsert: true,
        new: true,
      };
    return await Cart.findOneAndUpdate(query, updateOrInsert, options).lean();
  }

  // private static async updateCartQuantity({
  //   userId,
  //   product = {},
  // }: {
  //   userId: string;
  //   product: any;
  // }) {
  //   const { productId, quantity } = product;
  //   const cart = await this.getUserCart(userId);

  //   if (!cart) {
  //     throw new NotFoundError("Giỏ hàng không tồn tại");
  //   }

  //   const query = {
  //       userId,
  //       "products.productId": productId,
  //       status: "active",
  //     },
  //     updateSet = {
  //       $inc: {
  //         "products.$.quantity": quantity || 1,
  //       },
  //       countProduct: cart.products.length,
  //     },
  //     options = {
  //       new: true,
  //       upsert: true,
  //     };

  //   return await Cart.findOneAndUpdate(query, updateSet, options).lean();
  // }

  private static async updateCartQuantity({
    userId,
    product = {},
  }: {
    userId: string;
    product: any;
  }) {
    const { productId, quantity, variantKey } = product;
    const cart = await this.getUserCart(userId);

    if (!cart) {
      throw new NotFoundError("Giỏ hàng không tồn tại");
    }

    // match by productId AND variantKey so different variants are different items
    const query: any = {
      userId,
      status: "active",
      "products.productId": productId,
      "products.variantKey":
        variantKey || this.generateVariantKey(product.variant),
    };

    const updateSet = {
      $inc: {
        "products.$.quantity": quantity || 1,
      },
      // keep countProduct unchanged (represents types), so do not overwrite
    };
    const options = {
      new: true,
      upsert: false,
    };

    return await Cart.findOneAndUpdate(query, updateSet, options).lean();
  }

  private static generateVariantKey(variant: any[] | undefined) {
    if (!variant || !Array.isArray(variant) || variant.length === 0)
      return "default";
    // sort theo attrId để key không phụ thuộc vào thứ tự
    const parts = [...variant]
      .map((v) => ({
        attrId: String(v.attrId || v.attrId),
        value: String(v.value || ""),
      }))
      .sort((a, b) => a.attrId.localeCompare(b.attrId))
      .map((p) => `${p.attrId}:${p.value}`);
    return parts.join("|");
  }

  // private static async pushProductToCart({
  //   userId,
  //   product = {},
  // }: {
  //   userId: string;
  //   product: any;
  // }) {
  //   return await Cart.findOneAndUpdate(
  //     {
  //       userId,
  //       status: "active",
  //     },
  //     {
  //       $push: {
  //         products: product, // Thêm sản phẩm mới vào mảng
  //       },
  //       $inc: {
  //         countProduct: 1, // Tăng tổng số loại sản phẩm
  //       },
  //     },
  //     {
  //       new: true,
  //       upsert: false, // Giả định giỏ hàng đã được tạo
  //     }
  //   ).lean();
  // }

  private static async pushProductToCart({
    userId,
    product = {},
  }: {
    userId: string;
    product: any;
  }) {
    // ensure variantKey stored on product
    product.variantKey = this.generateVariantKey(product.variant);

    return await Cart.findOneAndUpdate(
      {
        userId,
        status: "active",
      },
      {
        $push: {
          products: product,
        },
        $inc: {
          countProduct: 1,
        },
      },
      {
        new: true,
        upsert: false,
      }
    ).lean();
  }

  // static async addProductToCart({
  //   userId,
  //   product = {},
  // }: {
  //   userId: string;
  //   product: any;
  // }) {
  //   // 1. Kiểm tra giỏ hàng
  //   const foundCart = await Cart.findOne({
  //     userId,
  //     status: "active",
  //   }).lean(); // Dùng .lean() để lấy object thuần túy

  //   // 2. Nếu không có giỏ hàng, tạo mới
  //   if (!foundCart) {
  //     // Giả sử createCart sẽ tạo cart và thêm sản phẩm đầu tiên
  //     return await this.createCart({ userId, product });
  //   }

  //   // 3. Nếu có giỏ hàng, kiểm tra sản phẩm đã tồn tại chưa
  //   // (Chuyển đổi sang String để đảm bảo so sánh ObjectId chính xác)
  //   const productInCart = foundCart.products.find(
  //     (p: any) => p.productId.toString() === product.productId.toString()
  //   );

  //   if (productInCart) {
  //     // 4a. Nếu sản phẩm ĐÃ CÓ, gọi hàm update số lượng
  //     return await this.updateCartQuantity({ userId, product });
  //   } else {
  //     // 4b. Nếu sản phẩm CHƯA CÓ, gọi hàm push sản phẩm mới
  //     return await this.pushProductToCart({ userId, product });
  //   }
  // }

  static async addProductToCart({
    userId,
    product = {},
  }: {
    userId: string;
    product: any;
  }) {
    // compute and attach variantKey for comparisons
    product.variantKey = this.generateVariantKey(product.variant);

    // 1. Kiểm tra giỏ hàng
    const foundCart = await Cart.findOne({
      userId,
      status: "active",
    }).lean();

    // 2. Nếu không có giỏ hàng, tạo mới
    if (!foundCart) {
      return await this.createCart({ userId, product });
    }

    // 3. Nếu có giỏ hàng, kiểm tra sản phẩm đã tồn tại chưa
    const productInCart = foundCart.products.find((p: any) => {
      const pProductId = String(p.productId);
      const pVariantKey =
        p.variantKey || CartService.generateVariantKey(p.variant);
      return (
        pProductId === String(product.productId) &&
        pVariantKey === product.variantKey
      );
    });

    if (productInCart) {
      // Nếu đã tồn tại EXACT variant -> tăng quantity
      return await this.updateCartQuantity({ userId, product });
    } else {
      // Nếu chưa tồn tại (hoặc same productId nhưng khác variant) -> push mới
      return await this.pushProductToCart({ userId, product });
    }
  }

  // static async updateProductInCart({
  //   userId,
  //   product,
  // }: {
  //   userId: string;
  //   product: Record<string, any>;
  // }) {
  //   const { productId, quantity, oldQuantity } = product || {};

  //   const foundProduct = await ProductService.getById(productId);

  //   if (!foundProduct) throw new NotFoundError("Product not found");

  //   if (quantity == 0) {
  //     // Remove product in cart
  //     const [_, cart] = await Promise.all([
  //       this.deleteProductInCart({
  //         userId,
  //         productId,
  //       }),
  //       this.getUserCart(userId),
  //     ]);
  //     await this.deleteProductInCart({
  //       userId,
  //       productId,
  //     });
  //     return cart;
  //   }
  //   return await this.updateCartQuantity({
  //     userId,
  //     product: {
  //       productId,
  //       quantity: quantity - oldQuantity,
  //     },
  //   });
  // }

  static async updateProductInCart({
    userId,
    product,
  }: {
    userId: string;
    product: Record<string, any>;
  }) {
    const { productId } = product || {};

    // normalize numbers
    const quantity = Number(product.quantity || 0);
    const oldQuantity = Number(product.oldQuantity || 0);

    // compute/accept variantKey
    const variantKey = product.variantKey || "default";

    const foundProduct = await ProductService.getById(productId);

    if (!foundProduct) throw new NotFoundError("Không tìm thấy sản phẩm!");

    // If new quantity is 0 -> remove specific variant (if variantKey present) or all items with productId
    if (quantity === 0) {
      await this.deleteProductInCart({
        userId,
        productId,
        variantKey,
      });
      // return current cart after removal
      return await this.getUserCart(userId);
    }

    // otherwise update quantity by difference (could be positive or negative)
    const diff = quantity - oldQuantity;
    if (diff === 0) {
      return await this.getUserCart(userId);
    }

    return await this.updateCartQuantity({
      userId,
      product: {
        productId,
        quantity: diff,
        variantKey,
      },
    });
  }

  // static async deleteProductInCart({
  //   userId,
  //   productId,
  // }: {
  //   userId: string;
  //   productId: string;
  // }) {
  //   const query = {
  //       userId,
  //       status: "active",
  //     },
  //     updateSet = {
  //       $pull: {
  //         products: {
  //           productId,
  //         },
  //       },
  //     };

  //   return await Cart.updateOne(query, updateSet);
  // }

  static async deleteProductInCart({
    userId,
    productId,
    variantKey,
  }: {
    userId: string;
    productId: string;
    variantKey?: string;
  }) {
    // pull condition: remove either specific variant (if variantKey) or all items with productId
    const pullCondition: any = { productId };
    if (variantKey) pullCondition.variantKey = variantKey;

    const query = {
      userId,
      status: "active",
    } as any;

    const updateSet = {
      $pull: {
        products: pullCondition,
      },
      $inc: {
        countProduct: -1,
      },
    };

    // return updated cart (so caller can fetch state) — keep upsert false
    return await Cart.findOneAndUpdate(query, updateSet, { new: true }).lean();
  }

  static async clearProductInCart({ userId }: { userId: string }) {
    return await Cart.findOneAndUpdate(
      {
        userId,
        status: "active",
      },
      {
        countProduct: 0,
        products: [],
      },
      {
        upsert: false,
        new: true,
      }
    ).lean();
  }

  static async getUserCart(userId: string) {
    return await Cart.findOne({
      userId,
      status: "active",
    }).lean();
  }
}

export default CartService;
