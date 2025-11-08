import { Request, Response } from "express";
import { STATUS_CODES } from "../utils/status-codes";
import OtpService from "../services/otp.service";

export const sendOtp = async (req: Request, res: Response) => {
  const result = await OtpService.createOtp({
    target: req.body.target,
    type: req.body.type,
    purpose: req.body.purpose,
  });

  if (!result) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      code: STATUS_CODES.INTERNAL_SERVER_ERROR,
      status: "error",
      message: "Gửi mã OTP thất bại!",
      data: false,
    });
    return;
  }

  res.status(STATUS_CODES.CREATED).json({
    code: STATUS_CODES.CREATED,
    status: "success",
    message: "Gửi mã OTP thành công!",
    data: result,
  });
};

export const verifyOtp = async (req: Request, res: Response) => {
  const { target, code } = req.body;

  const result = await OtpService.verifyOtp({
    target,
    code,
    purpose: req.body.purpose || "reset_password",
  });

  if (!result) {
    res.status(STATUS_CODES.BAD_REQUEST).json({
      code: STATUS_CODES.BAD_REQUEST,
      status: "error",
      message: "Xác thực mã OTP thất bại!",
      data: false,
    });
    return;
  }

  res.status(STATUS_CODES.OK).json({
    code: STATUS_CODES.OK,
    status: "success",
    message: "Xác thực mã OTP thành công!",
    data: true,
  });
};
