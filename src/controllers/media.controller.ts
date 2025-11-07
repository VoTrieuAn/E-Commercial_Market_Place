import { Request, Response } from "express";
import MediaService from "../services/media.service";
import { STATUS_CODES } from "../utils/status-codes";

export const uploadImage = async (req: Request, res: Response) => {
  const result = await MediaService.uploadImage(req);

  res.status(STATUS_CODES.OK).json({
    code: 200,
    status: "success",
    message: "Upload ảnh feedback thành công!",
    data: result,
  });
};
