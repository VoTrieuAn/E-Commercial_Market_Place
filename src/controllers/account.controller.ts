import { Request, Response } from "express";
import { STATUS_CODES } from "../utils/status-codes";
// import AccountAdminService from "../../services/admin/account-admin.service";
import { compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { pathAdmin } from "../configs/variable.config";
// import { logAdminAction } from "../helpers/log.helper";
import { IAccountRequest } from "../models/interfaces/account.interface";

// [GET] /admin/accounts/login
export const login = async (req: Request, res: Response) => {
  res.render("admin/pages/account-login", {
    pageTitle: "Đăng nhập trang quản trị",
  });
};

// [GET] /admin/accounts/logout
export const logout = async (req: IAccountRequest, res: Response) => {
  res.clearCookie("token");
  res.redirect(`/${pathAdmin}/accounts/login`);
  // logAdminAction(req, { title: "Đăng xuất hệ thống" });
};

// [POST] /admin/accounts/login
export const loginPost = async (req: IAccountRequest, res: Response) => {
  // const { email, password, rememberPassword } = req.body;

  // let token = "";

  // if (
  //   email === process.env.SUPER_ADMIN_EMAIL &&
  //   password === process.env.SUPER_ADMIN_PASSWORD
  // ) {
  //   token = sign(
  //     {
  //       id: process.env.SUPER_ADMIN_ID,
  //       email: process.env.SUPER_ADMIN_EMAIL,
  //     },
  //     process.env.JWT_SECRET_KEY as string,
  //     {
  //       expiresIn: rememberPassword ? "7d" : "1d",
  //     }
  //   );
  //   req.adminId = process.env.SUPER_ADMIN_ID as string;
  // } else {
  //   // Kiểm tra tài khoản có tồn tại không
  //   const existAccount = await AccountAdminService.getByEmail(email, {
  //     deleted: false,
  //   });

  //   // Nếu không tồn tại trả về lỗi
  //   if (!existAccount) {
  //     res.status(STATUS_CODES.UNAUTHORIZED).json({
  //       code: STATUS_CODES.UNAUTHORIZED,
  //       status: "error",
  //       message: "Email hoặc mật khẩu không đúng",
  //     });
  //     return;
  //   }

  //   // Kiểm tra mật khẩu có đúng không
  //   const isPasswordValid = compareSync(
  //     password,
  //     existAccount.password as string
  //   );

  //   // Nếu mật khẩu không đúng trả về lỗi
  //   if (!isPasswordValid) {
  //     res.status(STATUS_CODES.UNAUTHORIZED).json({
  //       code: STATUS_CODES.UNAUTHORIZED,
  //       status: "error",
  //       message: "Email hoặc mật khẩu không đúng",
  //     });
  //     return;
  //   }

  //   // Kiểm tra trạng thái tài khoản
  //   if (existAccount.status !== "active") {
  //     res.status(STATUS_CODES.FORBIDDEN).json({
  //       code: STATUS_CODES.FORBIDDEN,
  //       status: "error",
  //       message: "Tài khoản của bạn không có quyền truy cập",
  //     });
  //     return;
  //   }

  //   // Tạo JWT token
  //   token = sign(
  //     {
  //       id: existAccount._id,
  //       email: existAccount.email,
  //     },
  //     process.env.JWT_SECRET_KEY as string,
  //     {
  //       expiresIn: rememberPassword ? "7d" : "1d",
  //     }
  //   );
  //   req.adminId = existAccount._id.toString();
  // }

  // // Thiết lập cookie
  // res.cookie("token", token, {
  //   httpOnly: true, // Chỉ cho phép truy cập cookie từ phía server, js ở client không truy cập được
  //   secure: process.env.NODE_ENV === "production", // Chỉ gửi cookie qua kết nối HTTPS trong môi trường production
  //   sameSite: "strict", // Ngăn chặn gửi cookie trong các yêu cầu cross-site (cùng domain)
  //   maxAge: rememberPassword ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000, // Thời gian sống của cookie (1 ngày)
  // });

  // logAdminAction(req, { title: "Đăng nhập hệ thống" });

  res.status(STATUS_CODES.OK).json({
    code: STATUS_CODES.OK,
    status: "success",
    message: "Đăng nhập thành công",
  });
};
