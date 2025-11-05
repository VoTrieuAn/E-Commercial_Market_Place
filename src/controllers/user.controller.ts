import { Response } from "express";
import {
  IAuthRequest,
  IDecodedTokenPayLoad,
} from "../models/interfaces/auth.interface";
import UserService from "../services/user.service";
import { STATUS_CODES } from "../utils/status-codes";
import { removeKeysObject } from "../utils/lodash.util";

export const getMe = async (req: IAuthRequest, res: Response) => {
  const { userId } = req.decodeUser as IDecodedTokenPayLoad;

  const result = await UserService.getUserById(userId.toString());

  if (!result) {
    res.status(STATUS_CODES.NOT_FOUND).json({
      code: STATUS_CODES.NOT_FOUND,
      status: "error",
      message: "User không tồn tại!",
    });
    return;
  }

  res.status(STATUS_CODES.OK).json({
    code: STATUS_CODES.OK,
    status: "error",
    message: "Lấy thông tin thành công!",
    data: removeKeysObject(result, ["__v", "password", "deleted"]),
  });
};
