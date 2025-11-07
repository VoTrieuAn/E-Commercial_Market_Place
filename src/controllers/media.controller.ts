import { Request, Response } from "express";
import MediaService from "../services/media.service";
import { STATUS_CODES } from "../utils/status-codes";

export const uploadImage = async (req: Request, res: Response) => {
  const result = await MediaService.uploadImage(req);

  res.status(STATUS_CODES.OK).json({
    code: 200,
    status: "success",
    message: "Upload ảnh thành công!",
    data: result,
  });
};

export const uploadVideo = async (req: Request, res: Response) => {
  const result = await MediaService.uploadVideo(req);

  res.status(STATUS_CODES.OK).json({
    code: 200,
    status: "success",
    message: "Upload video thành công!",
    data: result,
  });
};
