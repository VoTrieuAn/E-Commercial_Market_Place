import { Request, Response } from "express";
import CartService from "../services/cart.service";
import {
  IAuthRequest,
  IDecodedTokenPayLoad,
} from "../models/interfaces/auth.interface";
import { STATUS_CODES } from "../utils/status-codes";
import { removeKeysObject } from "../utils/lodash.util";

export const cart = async (req: IAuthRequest, res: Response) => {
  const { userId } = req.decodeUser as IDecodedTokenPayLoad;
  const result = await CartService.getUserCart(userId);

  const total = result?.products.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity;
  }, 0);

  res.status(STATUS_CODES.OK).json({
    code: STATUS_CODES.OK,
    status: "success",
    message: "Lấy giỏ hàng thành công!",
    data: {
      ...removeKeysObject(result as object, [
        "__v",
        "status",
        "createdAt",
        "updatedAt",
      ]),
      total: total || 0,
    },
  });
};

export const cartPost = async (req: IAuthRequest, res: Response) => {
  const { userId } = req.decodeUser as IDecodedTokenPayLoad;
  const product = req.body;
  const result = await CartService.addProductToCart({
    userId,
    product,
  });

  res.status(STATUS_CODES.CREATED).json({
    code: STATUS_CODES.CREATED,
    status: "success",
    message: "Thêm vào giỏ hàng thành công!",
    data:
      removeKeysObject(result as object, [
        "__v",
        "status",
        "createdAt",
        "updatedAt",
      ]) || {},
  });
};

export const cartPatch = async (req: IAuthRequest, res: Response) => {
  const { userId } = req.decodeUser as IDecodedTokenPayLoad;
  const product = req.body;
  const result = await CartService.updateProductInCart({
    userId,
    product,
  });
  res.status(STATUS_CODES.OK).json({
    code: STATUS_CODES.OK,
    status: "success",
    message: "Cập nhật thành công",
    data: result,
  });
};

export const cartClearPatch = async (req: IAuthRequest, res: Response) => {
  const { userId } = req.decodeUser as IDecodedTokenPayLoad;
  const result = await CartService.clearProductInCart({
    userId,
  });
  res.status(STATUS_CODES.OK).json({
    code: STATUS_CODES.OK,
    status: "success",
    message: "Dọn dẹp sản phẩm thành công!",
    data:
      removeKeysObject(result as object, [
        "__v",
        "status",
        "createdAt",
        "updatedAt",
      ]) || {},
  });
};

export const cartDelete = async (req: IAuthRequest, res: Response) => {
  const { userId } = req.decodeUser as IDecodedTokenPayLoad;
  const { productId } = req.body;
  const result = await CartService.deleteProductInCart({
    userId,
    productId,
  });

  const { matchedCount } = result;

  if (matchedCount === 0) {
    res.status(STATUS_CODES.NOT_FOUND).json({
      code: STATUS_CODES.NOT_FOUND,
      status: "error",
      message: "Sản phẩm không tồn tại trong giỏ hàng!",
    });

    return;
  }

  res.status(STATUS_CODES.OK).json({
    code: STATUS_CODES.OK,
    status: "success",
    message: "Đã sản phẩm khỏi giỏ hàng!",
    data: result,
  });
};
