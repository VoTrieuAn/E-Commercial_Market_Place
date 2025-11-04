import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE as string);
    console.log("Kết nối thành công đến cơ sở dữ liệu MongoDB!");
  } catch (error) {
    console.log("Kết nối thất bại!", error);
  }
};
