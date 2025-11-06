import { NotFoundError } from "../core/error.response";
import Order from "../models/order.model";

import UserAddressService from "./user-address.service";

class OrderService {
  static async create(userId: string, data: any) {
    const shippingAddress = await UserAddressService.getAddressByUser(userId);

    if (!shippingAddress) {
      throw new NotFoundError("Địa chỉ User không tồn tại");
    }

    const { _id } = shippingAddress;

    return await Order.create({
      user: userId,
      shippingAddress: _id,
      ...data,
    });
  }

  static async getById(id: string, userId: string) {
    return await Order.findOne({ _id: id, user: userId })
      .populate("shippingAddress", "-_id -user -__v -updatedAt -createdAt")
      .lean()
      .exec();
  }

  static async getOrderByUser(
    userId: string,
    options: { skip: number; limit: number } = {
      skip: 0,
      limit: 20,
    }
  ) {
    const { skip, limit } = options;

    const [data, total] = await Promise.all([
      Order.find({
        user: userId,
      })
        .populate("shippingAddress", "-_id -user -__v -updatedAt -createdAt")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(),
      Order.countDocuments({
        user: userId,
      }),
    ]);
    return { data, total };
  }

  static async updateStatus({
    orderId,
    userId,
    status,
  }: {
    orderId: string;
    userId: string;
    status: string;
  }) {
    return await Order.findOneAndUpdate(
      {
        _id: orderId,
        user: userId,
      },
      { status },
      { new: true }
    ).lean();
  }

  static async cancel(id: string, userId: string) {
    const order = await this.getById(id, userId);

    if (!order) {
      throw new NotFoundError("Đơn đặt không tồn tại!");
    }

    return await Order.findOneAndUpdate(
      {
        _id: id,
        user: userId,
      },
      { status: "cancelled" },
      { new: true }
    ).lean();
  }

  static async deleteOrderByStatusCheckout(id: string, userId: string) {
    const order = await this.getById(id, userId);

    if (!order) {
      throw new NotFoundError("Đơn đặt không tồn tại!");
    }

    if (order.status !== "checkout") {
      throw new NotFoundError("Chỉ được xóa đơn hàng ở trạng thái 'checkout'!");
    }

    return await Order.findOneAndDelete({
      _id: id,
      user: userId,
    }).lean();
  }
}

export default OrderService;
