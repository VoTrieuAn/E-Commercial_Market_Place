import { Response } from "express";
import { IAuthRequest } from "../models/interfaces/auth.interface";
import VoucherService from "../services/voucher.service";
import { STATUS_CODES } from "../utils/status-codes";

export const voucher = async (req: IAuthRequest, res: Response) => {
  res.status(STATUS_CODES.OK).json({
    code: STATUS_CODES.OK,
    status: "success",
    message: "Lấy danh sách mã giảm giá thành công",
    data: [],
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
