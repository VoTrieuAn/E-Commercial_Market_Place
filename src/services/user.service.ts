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
}

export default UserService;
