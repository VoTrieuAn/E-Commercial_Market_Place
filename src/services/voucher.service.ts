import { BadRequestError, NotFoundError } from "../core/error.response";
import { VoucherAppliesTo } from "../models/enum/voucher.enum";
import Voucher from "../models/voucher.model";

/**
 * Các tính năng cần thiết của một Discount Service trong e-commerce:
 * 1. Generator Discount Code [Shop | Admin]
 * 2. Get all discount codes [User | Shop]
 * 3. Get all product by discount code [User]
 * 4. Verify discount code [User]
 * 4. Get discount amount [User]
 * 5. Delete discount code [Shop | Admin]
 * 6. Cancel discount code [User]
 *  */

class VoucherService {
  static async createVoucherCode(payload: any) {
    const {
      code,
      startDate,
      endDate,
      status,
      minOrderValue,
      productIds,
      appliesTo,
      name,
      description,
      type,
      value,
      maxValue,
      maxUses,
      usesCount,
      usersUsed,
      maxUsesPerUser,
    } = payload;

    if (new Date(startDate) >= new Date(endDate)) {
      throw new BadRequestError("Ngày bắt đầu phải trước ngày kết thúc!");
    }

    const foundVoucher = await Voucher.findOne({
      code,
    }).lean();

    if (foundVoucher && foundVoucher.status === "active") {
      throw new BadRequestError("Mã giảm giá đã tồn tại!");
    }

    const newVoucher = await Voucher.create({
      name,
      description,
      type,
      value,
      code,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      maxUses,
      maxValue,
      usesCount: usesCount,
      usersUsed: usersUsed,
      maxUsesPerUser,
      minOrderValue: minOrderValue || 0,
      status,
      appliesTo,
      productIds: appliesTo === VoucherAppliesTo.ALL ? [] : productIds,
    });

    return newVoucher;
  }

  // /**
  //  * Get all product by discount code
  //  * @param {code, shopId, userId, limit, page}
  //  * @returns
  //  */
  // static async getAllDiscountCodeWithProduct({
  //   code,
  //   shopId,
  //   limit,
  //   page,
  // }: {
  //   code: string;
  //   shopId: string;
  //   userId?: string;
  //   limit: number;
  //   page: number;
  // }) {
  //   // Create index for discount_code
  //   const foundDiscount = await discountSchema
  //     .findOne({
  //       code,
  //       shop_id: convertToObjectId(shopId),
  //     })
  //     .lean();

  //   if (!foundDiscount || !foundDiscount.is_active) {
  //     throw new NotFoundError("Discount code not exists!");
  //   }

  //   const { applies_to, product_ids } = foundDiscount;

  //   let products = null;
  //   if (applies_to === DiscountAppliesTo.ALL) {
  //     // Get all product
  //     products = await findAllProduct({
  //       filter: {
  //         product_shop: convertToObjectId(shopId),
  //         is_publish: true,
  //       },
  //       limit: +limit,
  //       page: +page,
  //       select: ["product_name"],
  //     });
  //   }

  //   if (applies_to === DiscountAppliesTo.SPECIFIC) {
  //     // Get the products ids
  //     products = await findAllProduct({
  //       filter: {
  //         _id: { $in: product_ids },
  //         product_shop: convertToObjectId(shopId),
  //         is_publish: true,
  //       },
  //       limit: +limit,
  //       page: +page,
  //       select: ["product_name"],
  //     });
  //   }

  //   return products ? products : [];
  // }

  // /**
  //  * Get all discount codes by shop
  //  * @param {shopId, limit, page}
  //  * @returns discountCodes
  //  */
  // static async getAllDiscountCodeByShop({
  //   limit,
  //   page,
  //   shopId,
  // }: {
  //   limit: number;
  //   page: number;
  //   shopId: string;
  // }) {
  //   return await findAllDiscountCodeUnSelect({
  //     limit,
  //     page,
  //     filter: {
  //       shop_id: convertToObjectId(shopId),
  //       is_active: true,
  //     },
  //     select: ["name", "code", "value", "type", "start_date", "end_date"],
  //   });
  // }

  // static async getDiscountAmount({
  //   code,
  //   userId,
  //   shopId,
  //   products,
  // }: {
  //   code: string;
  //   userId: string;
  //   shopId: string;
  //   products: any[];
  // }) {
  //   const foundDiscount = await checkDiscountExists({
  //     code,
  //     shop_id: convertToObjectId(shopId),
  //   });

  //   if (!foundDiscount) {
  //     throw new NotFoundError("Discount code not exists!");
  //   }

  //   const {
  //     is_active,
  //     max_uses,
  //     min_order_value,
  //     max_uses_per_user,
  //     type,
  //     value,
  //   } = foundDiscount;

  //   if (!is_active) {
  //     throw new BadRequestError("Discount expired!");
  //   }

  //   if (!max_uses) {
  //     throw new BadRequestError("Discount code has been used up!");
  //   }

  //   let totalOrder = 0;

  //   if ((min_order_value as number) > 0) {
  //     totalOrder = products.reduce((acc, product) => {
  //       return acc + product.price * product.quantity;
  //     }, 0);

  //     if (totalOrder < (min_order_value as number)) {
  //       throw new BadRequestError(
  //         `Order must be at least ${min_order_value} to apply this discount code!`
  //       );
  //     }
  //   }

  //   if (max_uses_per_user > 0) {
  //     const userUsedDiscount = foundDiscount.users_used.find(
  //       (user) => user.userId === userId
  //     );
  //     if (userUsedDiscount) {
  //       // ...
  //     }
  //   }

  //   // Check xem discount này là fixed_amount hay percentage

  //   const amount =
  //     type === DiscountType.FIXED_AMOUNT ? value : totalOrder * (value / 100);

  //   return {
  //     totalOrder,
  //     // Số tiền được giảm
  //     discount: amount,
  //     // Tổng tiền còn lại phải trả
  //     totalPrice: totalOrder - amount,
  //   };
  // }

  // static async deleteDiscountCode({
  //   code,
  //   shopId,
  // }: {
  //   code: string;
  //   shopId: string;
  // }) {
  //   const deleted = await discountSchema.findOneAndDelete({
  //     code,
  //     shop_id: convertToObjectId(shopId),
  //   });

  //   return deleted;
  // }

  // static async cancelDiscountCode({
  //   code,
  //   shopId,
  //   userId,
  // }: {
  //   code: string;
  //   shopId: string;
  //   userId: string;
  // }) {
  //   const foundDiscount = await checkDiscountExists({
  //     code,
  //     shop_id: convertToObjectId(shopId),
  //   });

  //   if (!foundDiscount) {
  //     throw new NotFoundError("Discount code not exists!");
  //   }

  //   const result = await discountSchema.findByIdAndUpdate(
  //     {
  //       _id: foundDiscount._id,
  //       is_active: true,
  //     },
  //     {
  //       $pull: {
  //         users_used: userId,
  //       },
  //       $inc: {
  //         max_uses: 1,
  //         uses_count: -1,
  //       },
  //     }
  //   );

  //   return result;
  // }
}

export default VoucherService;
