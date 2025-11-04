import { Request, Response } from "express";
import CartService from "../services/cart.service";
import {
  IAuthRequest,
  ITokenPayLoad,
} from "../models/interfaces/auth.interface";
import { STATUS_CODES } from "../utils/status-codes";

export const cart = async (req: IAuthRequest, res: Response) => {
  const { userId } = req.user as ITokenPayLoad;
  const result = await CartService.getUserCart(userId);

  res.status(STATUS_CODES.OK).json({
    code: STATUS_CODES.OK,
    status: "success",
    message: "Lấy giỏ hàng thành công!",
    data: result,
  });
};

export const cartPost = async (req: IAuthRequest, res: Response) => {
  // Tạm thời lấy user id từ ngoài truyền vào, sau nay sẽ lấy từ token
  const { userId } = req.user as ITokenPayLoad;
  const product = req.body;
  const result = await CartService.addProductToCart({
    userId,
    product: product,
  });
  res.status(STATUS_CODES.CREATED).json({
    code: STATUS_CODES.CREATED,
    status: "success",
    message: "Thêm vào giỏ hàng thành công!",
    data: result,
  });
};

export const cartPatch = async (req: IAuthRequest, res: Response) => {
  const { userId } = req.user as ITokenPayLoad;
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

export const cartDelete = async (req: IAuthRequest, res: Response) => {
  const { userId } = req.user as ITokenPayLoad;
  const { productId } = req.body;
  const result = await CartService.deleteProductInCart({
    userId,
    productId,
  });

  res.status(STATUS_CODES.OK).json({
    code: STATUS_CODES.OK,
    status: "success",
    message: "Đã sản phẩm khỏi giỏ hàng!",
    data: result,
  });
};
