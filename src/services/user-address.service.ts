import { NotFoundError } from "../core/error.response";
import UserAddress from "../models/user-address.model";
import UserService from "./user.service";

class UserAddressService {
  static async getAddressByUser(userId: string) {
    const address = await UserAddress.findOne({
      user: userId,
    }).lean();

    if (!address) {
      throw new NotFoundError("Địa chỉ người dùng không tồn tại!");
    }

    return address;
  }

  static async upsert(userId: string, data: any) {
    const user = await UserService.getUserById(userId);

    if (!user) {
      throw new NotFoundError("User không tồn tại!");
    }

    data.fullName = user.name;

    return await UserAddress.findOneAndUpdate(
      {
        user: userId,
      },
      data,
      {
        upsert: true,
        new: true,
      }
    ).lean();
  }
}

export default UserAddressService;
