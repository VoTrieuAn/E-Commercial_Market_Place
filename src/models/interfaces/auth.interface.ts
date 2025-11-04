import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface ITokenPayLoad extends JwtPayload {
  userId: string;
  email: string;
}

export interface IAuthRequest extends Request {
  user?: ITokenPayLoad;
}
