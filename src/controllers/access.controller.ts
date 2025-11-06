import { Request, Response } from "express";
import { STATUS_CODES } from "../utils/status-codes";
// import AccountAdminService from "../../services/admin/account-admin.service";
import { compareSync, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { pathAdmin } from "../configs/variable.config";
import UserService from "../services/user.service";
import AccessService from "../services/access.service";
import {
  IAuthRequest,
  IDecodedTokenPayLoad,
} from "../models/interfaces/auth.interface";
import { IKeyTokenRequestBody } from "../models/interfaces/key-token.request";
import { formatStringIdToObjectId } from "../utils/mongoose.util";
import { removeKeysObject } from "../utils/lodash.util";
import moment from "moment";
// import { logAdminAction } from "../helpers/log.helper";
// import { IAccountRequest } from "../models/interfaces/auth.interface";

export const getUserByEmail = async (req: Request, res: Response) => {
  const { email } = req.body;
  const result = await AccessService.getAccountByEmail(email);

  res.status(STATUS_CODES.OK).json({
    code: STATUS_CODES.OK,
    status: "success",
    message: "Lấy thông tin thành công!",
    data: {
      ...removeKeysObject(result, ["__v", "password", "deleted", "createdAt"]),
      dateOfBirth: moment(result.dateOfBirth).format("DD/MM/YYYY"),
    },
  });
};

// [POST] /access/logout
export const logout = async (req: IAuthRequest, res: Response) => {
  const { keyStore } = req as IAuthRequest;

  const result = await AccessService.logout(keyStore as IKeyTokenRequestBody);

  res.status(STATUS_CODES.OK).json({
    code: STATUS_CODES.OK,
    status: "success",
    message: "Đăng xuất thành công!",
    data: result,
  });
};

// [POST] /access/register
export const registerPost = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const newUser = await AccessService.signUp({ name, email, password });

  res.status(STATUS_CODES.CREATED).json({
    code: STATUS_CODES.CREATED,
    status: "success",
    message: "Đăng ký tài khoản thành công!",
    data: newUser,
  });
};

export const forgotPasswordPost = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await AccessService.forgetPassword(email, password);

  if (!result) {
    res.status(STATUS_CODES.NOT_FOUND).json({
      code: STATUS_CODES.NOT_FOUND,
      status: "error",
      message: "Email không tồn tại!",
    });
    return;
  }

  res.status(STATUS_CODES.OK).json({
    code: STATUS_CODES.OK,
    status: "success",
    message: "Cập nhật mật khẩu thành công!",
    data: {
      ...removeKeysObject(result as object, [
        "__v",
        "password",
        "deleted",
        "createdAt",
      ]),
      dateOfBirth: moment(result.dateOfBirth).format("DD/MM/YYYY"),
    },
  });
};

// [POST] /access/refresh-token
export const refreshToken = async (req: IAuthRequest, res: Response) => {
  // const result = await AccessService.login(req.body);
  const { decodeUser, keyStore } = req;
  const { refreshToken } = req.body;
  const result = await AccessService.refreshToken({
    refreshToken,
    keyStore: keyStore as IKeyTokenRequestBody,
    user: decodeUser as IDecodedTokenPayLoad,
  });

  res.status(STATUS_CODES.OK).json({
    code: STATUS_CODES.OK,
    status: "success",
    message: "Làm mới token thành công!",
    data: result,
  });
};
// [POST] /access/login
export const loginPost = async (req: Request, res: Response) => {
  const result = await AccessService.login(req.body);

  res.status(STATUS_CODES.OK).json({
    code: STATUS_CODES.OK,
    status: "success",
    message: "Đăng nhập thành công!",
    data: result,
  });
};
