import { ForbiddenError, NotFoundError } from "../core/error.response";
import Feedback from "../models/feedback.model";

class FeedbackService {
  static async getFeedback(find: any = {}) {
    return await Feedback.findOne(find).lean();
  }

  static async create(userId: string, payload: any) {
    const existingFeedback = await this.getFeedback({
      user: userId,
      orderId: payload.orderId,
      productId: payload.productId,
    });

    if (existingFeedback) {
      throw new ForbiddenError("Sản phẩm đã được gửi phản hồi!");
    }

    const doc = await Feedback.create({
      user: userId,
      ...payload,
    });
    return doc;
  }

  static async update(userId: string, payload: any) {
    const foundFeedback = await this.getFeedback({
      user: userId,
      orderId: payload.orderId,
      productId: payload.productId,
    });

    if (!foundFeedback) {
      throw new NotFoundError("Phản hồi không tồn tại!");
    }

    if (foundFeedback.updated) {
      throw new ForbiddenError("Phản hồi chỉ được chỉnh sửa một lần!");
    }

    return await Feedback.findOneAndUpdate(
      {
        user: userId,
        orderId: payload.orderId,
        productId: payload.productId,
        updated: false,
      },
      {
        ...payload,
        updated: true,
      },
      {
        upsert: true,
        new: true,
      }
    );
  }

  static async getByUserId(
    userId: string,
    options: { skip: number; limit: number } = { skip: 0, limit: 5 }
  ) {
    return await Feedback.find({ user: userId })
      .skip(options.skip)
      .limit(options.limit)
      .lean();
  }

  static async getFeedbackByProductId(
    filter: any = {},
    options: { skip: number; limit: number } = { skip: 0, limit: 5 }
  ) {
    const q = { ...filter };

    return await Feedback.find(q)
      .populate("user", "name avatar -_id")
      .sort({ createdAt: -1 })
      .skip(options.skip)
      .limit(options.limit)
      .lean();
  }
}

export default FeedbackService;
