import User from "../models/user.model";

class UserService {
  static async getUserById(userId: string) {
    return await User.findById(userId).lean();
  }

  static async getByEmail(email: string) {
    return await User.findOne({ email: email, deleted: false }).lean();
  }

  static async create(data: any) {
    return await User.create(data);
  }

  static async update(userId: string, data: any) {
    return await User.findOneAndUpdate(
      {
        _id: userId,
        status: "active",
      },
      data,
      {
        upsert: false,
        new: true,
      }
    ).lean();
  }
}

export default UserService;
