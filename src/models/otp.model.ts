import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    // là gì?
    target: { type: String, required: true, index: true },
    type: {
      type: String,
      enum: ["sms", "email"],
      default: "email",
      required: true,
    },
    purpose: {
      type: String,
      enum: ["default", "reset_password"],
      default: "default",
      index: true,
    },
    code: { type: String, required: true },
    used: { type: Boolean, default: false },
  },
  { timestamps: true }
);

schema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

schema.index({ target: 1, purpose: 1 });

const Otp = model("Otp", schema, "otps");

export default Otp;
