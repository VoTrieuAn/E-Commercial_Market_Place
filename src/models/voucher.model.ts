import { Schema, model } from "mongoose";

const schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  type: { type: String, enum: ["percentage", "fixed_amount"], required: true }, // percentage or fixed amount
  value: { type: Number, required: true }, // 10.000, 20.000
  // Nếu là percentage thì có maxValue
  maxValue: { type: Number },
  code: { type: String, required: true, unique: true }, // discount code
  startDate: { type: Date, required: true }, // ngày bắt đầu
  endDate: { type: Date, required: true }, // ngày kết thúc
  maxUses: { type: Number, required: true }, // số lượng discount được áp dụng
  usesCount: { type: Number, require: true }, // số lần đã sử dụng
  usersUsed: { type: Array, default: [] }, // danh sách user đã sử dụng
  maxUsesPerUser: { type: Number, required: true }, // số lần sử dụng tối đa cho mỗi user
  minOrderValue: { type: Number, require: true }, // giá trị đơn hàng tối thiểu để áp dụng mã giảm giá
  status: { type: String, enum: ["active", "inactive"], default: "active" }, // trạng thái mã giảm giá
  appliesTo: { type: String, enum: ["all", "specific"], required: true }, // áp dụng cho tất cả hoặc sản phẩm cụ thể
  // Khi nào specific thì mới có danh sách product_ids
  productIds: { type: Array, default: [] }, // danh sách sản phẩm áp dụng
});

const Voucher = model("Voucher", schema, "vouchers");

export default Voucher;
