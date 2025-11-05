import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    dateOfBirth: {
      type: Date,
      default: null,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    phone: {
      type: String,
      default: "",
    },
    // emailVerifyToken: String,
    // forGotPasswordToken: String,
    avatar: {
      type: String,
      default: "",
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema, "users-demo");

export default User;
