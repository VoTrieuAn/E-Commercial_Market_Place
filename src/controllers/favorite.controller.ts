import { Response } from "express";
import {
  IAuthRequest,
  IDecodedTokenPayLoad,
} from "../models/interfaces/auth.interface";
import { STATUS_CODES } from "../utils/status-codes";
import FavoriteService from "../services/favorite.service";
import { removeKeysObject } from "../utils/lodash.util";

export const favorite = async (req: IAuthRequest, res: Response) => {
  const { userId } = req.decodeUser as IDecodedTokenPayLoad;

  const results = await FavoriteService.getFavoriteByUserId(userId);

  res.status(STATUS_CODES.OK).json({
    code: STATUS_CODES.OK,
    status: "active",
    message: "Lấy danh sách sản phẩm yêu thích thành công",
    metadata: results.map((result) =>
      removeKeysObject(result, ["__v", "updatedAt"])
    ),
  });
};

export const favoritePost = async (req: IAuthRequest, res: Response) => {
  const { userId } = req.decodeUser as IDecodedTokenPayLoad;
  const { productId } = req.body;

  const result = await FavoriteService.favorite(userId, productId);

  res.status(STATUS_CODES.CREATED).json({
    code: STATUS_CODES.CREATED,
    status: "success",
    message: "Yêu thích thành công!",
    data: removeKeysObject(result, ["__v", "updatedAt"]),
  });
};

export const unFavoritePost = async (req: IAuthRequest, res: Response) => {
  const { userId } = req.decodeUser as IDecodedTokenPayLoad;
  const { productId } = req.body;

  const result = await FavoriteService.unFavorite(userId, productId);

  res.status(STATUS_CODES.CREATED).json({
    code: STATUS_CODES.CREATED,
    status: "success",
    message: "Bỏ yêu thích thành công!",
    data: result,
  });
};
