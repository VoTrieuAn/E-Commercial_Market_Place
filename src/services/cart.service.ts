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
  private static async createCart({
    userId,
    product = {},
  }: {
    userId: string;
    product: any;
  }) {
    const query = {
        userId: userId,
        status: "active",
      },
      updateOrInsert = {
        $addToSet: {
          products: product,
        },
        countProduct: product.quantity || 1,
      },
      options = {
        // Update the document if it exists
        upsert: true,
        // Create the document if it doesn't exist
        new: true,
      };
    return await Cart.findOneAndUpdate(query, updateOrInsert, options).lean();
  }

  private static async updateCartQuantity({
    userId,
    product = {},
  }: {
    userId: string;
    product: any;
  }) {
    const { productId, quantity } = product;
    const cart = await this.getUserCart(userId);

    if (!cart) {
      throw new NotFoundError("Giỏ hàng không tồn tại");
    }

    const query = {
        userId,
        "products.productId": productId,
        status: "active",
      },
      updateSet = {
        $inc: {
          "products.$.quantity": quantity || 1,
        },
        countProduct: cart.products.length,
      },
      options = {
        new: true,
        upsert: true,
      };

    return await Cart.findOneAndUpdate(query, updateSet, options).lean();
  }

  static async addProductToCart({
    userId,
    product = {},
  }: {
    userId: string;
    product: any;
  }) {
    // Check cart exists
    const foundCart = await Cart.findOne({
      userId,
    });
    if (!foundCart) {
      // Create new cart
      return await this.createCart({ userId, product });
    }

    // Nếu có giỏ hàng rồi nhưng chưa có sản phẩm
    if (!foundCart.products.length) {
      return await this.createCart({ userId, product });
    }

    // Nếu có giỏ hàng và có sản phẩm rồi, thì update quantity
    return await this.updateCartQuantity({ userId, product });
  }

  /**
      product: {
        productId,
        quantity,
        price,
        oldQuantity,
      }
   */

  static async updateProductInCart({
    userId,
    product,
  }: {
    userId: string;
    product: Record<string, any>;
  }) {
    const { productId, quantity, oldQuantity } = product || {};

    const foundProduct = await ProductService.getById(productId);

    if (!foundProduct) throw new NotFoundError("Product not found");

    if (quantity === 0) {
      // Remove product in cart
      await this.deleteProductInCart({
        userId,
        productId,
      });
    }
    return await this.updateCartQuantity({
      userId,
      product: {
        productId,
        quantity: quantity - oldQuantity,
      },
    });
  }

  static async deleteProductInCart({
    userId,
    productId,
  }: {
    userId: string;
    productId: string;
  }) {
    const query = {
        userId,
        status: "active",
      },
      updateSet = {
        $pull: {
          products: {
            productId,
          },
        },
      };

    return await Cart.updateOne(query, updateSet);
  }

  static async getUserCart(userId: string) {
    return await Cart.findOne({
      userId,
      status: "active",
    }).lean();
  }
}

export default CartService;
