import { Request } from "express";

export interface IAccountRequest extends Request {
  adminId?: string;
}
