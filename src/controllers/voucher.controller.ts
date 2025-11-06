import { Response } from "express";
import {
  IAuthRequest,
  IDecodedTokenPayLoad,
} from "../models/interfaces/auth.interface";
import VoucherService from "../services/voucher.service";
import { STATUS_CODES } from "../utils/status-codes";
import paginationHelper from "../helpers/pagination.helper";
import { removeKeysObject } from "../utils/lodash.util";

export const voucher = async (req: IAuthRequest, res: Response) => {
  const { page, limit } = req.query;
  const pagination = await paginationHelper({
    page: page ? +page : 1,
    limit: limit ? +limit : 10,
    modelName: "Voucher",
  });
  const results = await VoucherService.getAllVouchers({
    limit: pagination.limit,
    skip: pagination.skip,
  });

  res.status(STATUS_CODES.OK).json({
    code: STATUS_CODES.OK,
    status: "success",
    message: "Lấy danh sách mã giảm giá thành công",
    metadata: results,
  });
};

export const voucherByUser = async (req: IAuthRequest, res: Response) => {
  const { userId } = req.decodeUser as IDecodedTokenPayLoad;
  const { page, limit } = req.query;

  const skip = page && limit ? (Number(page) - 1) * Number(limit) : 0;

  const results = await VoucherService.getAllVouchersByUser({
    userId,
    limit: limit ? Number(limit) : 10,
    skip: skip,
  });

  res.status(STATUS_CODES.OK).json({
    code: STATUS_CODES.OK,
    status: "success",
    message: "Lấy danh sách mã giảm giá của user thành công",
    metadata: results.map((voucher) =>
      removeKeysObject(voucher, ["__v", "usersUsed", "appliesTo", "__v"])
    ),
  });
};

export const voucherPost = async (req: IAuthRequest, res: Response) => {
  const result = await VoucherService.createVoucherCode({
    ...req.body,
  });

  res.status(STATUS_CODES.CREATED).json({
    code: STATUS_CODES.CREATED,
    status: "success",
    message: "Tạo mã giảm giá thành công",
    data: result,
  });
};

export const amountPost = async (req: IAuthRequest, res: Response) => {
  const { userId } = req.decodeUser as IDecodedTokenPayLoad;

  const result = await VoucherService.getVoucherAmount({
    ...req.body,
    userId,
  });

  res.status(STATUS_CODES.OK).json({
    code: STATUS_CODES.OK,
    status: "success",
    message: "Lấy số tiền được giảm thành công",
    data: result,
  });
};
