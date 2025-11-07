import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: String,
    dateOfBirth: {
      type: Date,
      default: null,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "male",
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
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
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
