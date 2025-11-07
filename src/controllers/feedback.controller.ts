import { Request, Response } from "express";
import {
  IAuthRequest,
  IDecodedTokenPayLoad,
} from "../models/interfaces/auth.interface";
import { STATUS_CODES } from "../utils/status-codes";
import FeedbackService from "../services/feedback.service";
import paginationHelper from "../helpers/pagination.helper";
import { removeKeysObject } from "../utils/lodash.util";

export const feedbackByProduct = async (req: IAuthRequest, res: Response) => {
  const { productId } = req.body;
  const { page, limit } = req.query;

  const pagination = await paginationHelper({
    modelName: "Feedback",
    find: { productId },
    limit: limit ? Number(limit) : 20,
    page: page ? Number(page) : 1,
  });

  const results = await FeedbackService.getFeedbackByProductId(
    {
      productId,
    },
    {
      skip: pagination.skip,
      limit: pagination.limit,
    }
  );

  res.status(STATUS_CODES.OK).json({
    code: 200,
    status: "success",
    message: "Lấy danh sách feedback thành công!",
    metadata: results.map((record) => removeKeysObject(record, ["__v"])),
    pagination,
  });
};

export const feedbackByUser = async (req: IAuthRequest, res: Response) => {
  const { userId } = req.decodeUser as IDecodedTokenPayLoad;
  const { page, limit } = req.query;

  const pagination = await paginationHelper({
    modelName: "Feedback",
    find: { user: userId },
    limit: limit ? Number(limit) : 20,
    page: page ? Number(page) : 1,
  });

  const results = await FeedbackService.getByUserId(userId, {
    skip: pagination.skip,
    limit: pagination.limit,
  });

  res.status(STATUS_CODES.OK).json({
    code: 200,
    status: "success",
    message: "Lấy danh sách feedback thành công!",
    metadata: results.map((record) => removeKeysObject(record, ["__v"])),
    pagination,
  });
};

export const feedbackPost = async (req: IAuthRequest, res: Response) => {
  const { userId } = req.decodeUser as IDecodedTokenPayLoad;
  const result = await FeedbackService.create(userId, req.body);

  res.status(STATUS_CODES.CREATED).json({
    code: 201,
    status: "success",
    message: "Gửi phản hồi thành công!",
    data: removeKeysObject(result as object, ["__v", "updated"]),
  });
};

export const feedbackPatch = async (req: IAuthRequest, res: Response) => {
  const { userId } = req.decodeUser as IDecodedTokenPayLoad;
  const result = await FeedbackService.update(userId, req.body);

  res.status(STATUS_CODES.CREATED).json({
    code: 201,
    status: "success",
    message: "Cập nhật phản hồi thành công!",
    data: removeKeysObject(result as object, ["__v", "updated"]),
  });
};
