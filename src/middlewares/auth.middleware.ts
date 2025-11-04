import { NextFunction, Request, Response } from "express";
import { pathAdmin } from "../configs/variable.config";
import { JwtPayload, verify } from "jsonwebtoken";
// import AccountAdminService from "../services/admin/account-admin.service";
// import permissions from "../commons/permission.common";
// import RoleService from "../services/admin/role.service";
import { STATUS_CODES } from "../utils/status-codes";
// import { IAccountRequest } from "../models/interfaces/auth.interface";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // try {
  //   const token = req.cookies["token"];
  //   // Nếu không có token thì chuyển về trang đăng nhập
  //   if (!token) {
  //     res.redirect(`/${pathAdmin}/accounts/login`);
  //     return;
  //   }
  //   // Giải mã token
  //   const decoded = verify(
  //     token,
  //     process.env.JWT_SECRET_KEY as string
  //   ) as JwtPayload;
  //   // Kiểm tra tài khoản có tồn tại không
  //   const { id, email } = decoded;
  //   if (
  //     email === process.env.SUPER_ADMIN_EMAIL &&
  //     id === process.env.SUPER_ADMIN_ID
  //   ) {
  //     res.locals.adminAccount = {
  //       fullname: process.env.SUPER_ADMIN_FULLNAME,
  //       email: process.env.SUPER_ADMIN_EMAIL,
  //       avatar: "",
  //     };
  //     res.locals.permissions = permissions.map((perm) => perm.id);
  //     req.adminId = process.env.SUPER_ADMIN_ID as string;
  //   } else {
  //     const existAccount = await AccountAdminService.getById(id, {
  //       email,
  //       deleted: false,
  //       status: "active",
  //     });
  //     // Nếu không tồn tại chuyển về trang đăng nhập
  //     if (!existAccount) {
  //       res.redirect(`/${pathAdmin}/accounts/login`);
  //       return;
  //     }
  //     res.locals.adminAccount = {
  //       fullname: existAccount.fullname,
  //       email: existAccount.email,
  //       avatar: existAccount.avatar,
  //     };
  //     let permissions: string[] = [];
  //     for (const role of existAccount.roles) {
  //       const roleInfo = await RoleService.getById(role, {
  //         deleted: false,
  //         status: "active",
  //       });
  //       if (roleInfo) {
  //         permissions = [...permissions, ...roleInfo.permissions];
  //       }
  //     }
  //     res.locals.permissions = permissions;
  //     req.adminId = existAccount._id.toString();
  //   }
  //   next();
  // } catch (error) {
  //   console.log(error);
  //   res.redirect(`/${pathAdmin}/accounts/login`);
  // }
};

export const checkPermissions = (permission: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals.permissions.includes(permission)) {
      res.status(STATUS_CODES.FORBIDDEN).json({
        code: STATUS_CODES.FORBIDDEN,
        status: "error",
        message: "Không có quyền truy cập!",
      });
      return;
    }
    next();
  };
};
