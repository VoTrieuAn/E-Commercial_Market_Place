import { Response } from "express";
import {
  IAuthRequest,
  IDecodedTokenPayLoad,
} from "../models/interfaces/auth.interface";
import OrderService from "../services/order.service";
import { STATUS_CODES } from "../utils/status-codes";
import { removeKeysObject } from "../utils/lodash.util";
import paginationHelper from "../helpers/pagination.helper";

export const createOrder = async (req: IAuthRequest, res: Response) => {
  const { userId } = req.decodeUser as IDecodedTokenPayLoad;

  const newRecord = await OrderService.create(userId, req.body);

  const result = await OrderService.getById(newRecord.id, userId);

  res.status(STATUS_CODES.CREATED).json({
    code: STATUS_CODES.CREATED,
    status: "success",
    message: "Tạo Order thành công!",
    data: removeKeysObject(result as object, ["__v", "updatedAt"]),
  });
};

export const listOrders = async (req: IAuthRequest, res: Response) => {
  const { userId } = req.decodeUser as IDecodedTokenPayLoad;
  const { page, limit } = req.query;

  const pagination = await paginationHelper({
    limit: limit ? Number(limit) : 20,
    page: page ? Number(page) : 1,
    modelName: "Order",
  });

  const results = await OrderService.getOrderByUser(userId, {
    skip: pagination.skip,
    limit: pagination.limit,
  });

  res.status(STATUS_CODES.OK).json({
    code: STATUS_CODES.OK,
    status: "success",
    message: "Lấy danh sách đơn đặt thành công",
    metadata: results,
    pagination,
  });
};

export const getOrder = async (req: IAuthRequest, res: Response) => {
  const { userId } = req.decodeUser as IDecodedTokenPayLoad;
  const { id } = req.params;

  const result = await OrderService.getById(id, userId);

  res.status(STATUS_CODES.OK).json({
    code: STATUS_CODES.OK,
    status: "success",
    message: "Lấy đơn đặt thành công!",
    data: removeKeysObject(result as object, ["__v"]),
  });
};

export const updateOrderStatus = async (req: IAuthRequest, res: Response) => {
  const { userId } = req.decodeUser as IDecodedTokenPayLoad;
  const { id } = req.params;
  const { status } = req.body;

  const result = await OrderService.updateStatus({
    orderId: id,
    userId,
    status,
  });

  res.status(STATUS_CODES.OK).json({
    code: STATUS_CODES.OK,
    status: "success",
    message: "Cập nhật trạng thái đơn đặt thành công",
    data: removeKeysObject(result as object, ["__v"]),
  });
};

export const cancelOrder = async (req: IAuthRequest, res: Response) => {
  const { userId } = req.decodeUser as IDecodedTokenPayLoad;
  const { id } = req.params;
  const result = await OrderService.cancel(id, userId);

  res.status(STATUS_CODES.OK).json({
    code: STATUS_CODES.OK,
    status: "success",
    message: "Hủy đơn đặt thành công",
    data: removeKeysObject(result as object, ["__v"]),
  });
};

export const deleteOrderByStatusCheckout = async (
  req: IAuthRequest,
  res: Response
) => {
  const { userId } = req.decodeUser as IDecodedTokenPayLoad;
  const { id } = req.params;
  const result = await OrderService.deleteOrderByStatusCheckout(id, userId);

  res.status(STATUS_CODES.OK).json({
    code: STATUS_CODES.OK,
    status: "success",
    message: "Hủy xem trước đơn đặt thành công",
    data: removeKeysObject(result as object, ["__v"]),
  });
};
