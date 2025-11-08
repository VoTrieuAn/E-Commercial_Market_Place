import { Request, Response } from "express";
import { STATUS_CODES } from "../utils/status-codes";
import OtpService from "../services/otp.service";

export const sendOtp = async (req: Request, res: Response) => {
  const result = await OtpService.createOtp({
    target: req.body.target,
    type: req.body.type,
    purpose: req.body.purpose,
  });

  res.status(STATUS_CODES.CREATED).json({
    code: STATUS_CODES.CREATED,
    status: "success",
    message: "Gửi mã OTP thành công!",
    data: result,
  });
};

export const verifyOtp = async (req: Request, res: Response) => {
  res.status(STATUS_CODES.OK).json({
    code: STATUS_CODES.OK,
    status: "success",
    message: "Xác thực mã OTP thành công!",
  });
};
