import { AuthFailedError, NotFoundError } from "../core/error.response";
import Otp from "../models/otp.model";
import { sendOtpEmail } from "../utils/email";

class OtpService {
  private static genCode(length = 6) {
    const min = 10 ** (length - 1);
    const max = 10 ** length - 1;
    return String(Math.floor(Math.random() * (max - min + 1)) + min);
  }

  static async createOtp({
    target,
    type = "email",
    purpose = "default",
    length = 6,
  }: {
    target: string;
    type: "sms" | "email";
    purpose?: string;
    length?: number;
  }) {
    const code = this.genCode(length);
    // upsert: create new OTP doc (don't set TTL manually, index handles expiry)
    const doc = await Otp.create({
      target,
      type,
      purpose,
      code,
      used: false,
    });

    await sendOtpEmail(target, code, "Mã OTP của bạn");

    return doc;
  }

  static async getLatestOtp(target: string, purpose = "default") {
    return Otp.findOne({ target, purpose, used: false })
      .sort({ createdAt: -1 })
      .lean();
  }

  static async verifyOtp({
    target,
    purpose = "default",
    code,
  }: {
    target: string;
    purpose?: string;
    code: string;
    maxAttempts?: number;
  }) {
    const otp = await this.getLatestOtp(target, purpose);
    if (!otp) {
      throw new NotFoundError("Mã OTP không tồn tại hoặc đã hết hạn");
    }

    if (otp.code !== code) {
      throw new AuthFailedError("Mã OTP không đúng");
    }

    // success
    return await Otp.findOneAndUpdate(
      {
        _id: otp._id,
        used: false,
      },
      { used: true },
      {
        new: true,
      }
    ).lean();
  }

  static async invalidateOtp(target: string, purpose = "default") {
    return Otp.updateMany({ target, purpose }, { used: true }).exec();
  }
}

export default OtpService;
