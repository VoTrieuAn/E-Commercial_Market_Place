import { model, Schema } from "mongoose";

const userAddressSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    fullName: { type: String, required: true },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    ward: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserAddress = model("UserAddress", userAddressSchema, "users-address");

export default UserAddress;
