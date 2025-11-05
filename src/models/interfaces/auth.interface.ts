import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { IKeyTokenRequestBody } from "./key-token.request";

export interface IDecodedTokenPayLoad extends JwtPayload {
  userId: string;
  email: string;
}

export interface IAuthRequest extends Request {
  decodeUser?: IDecodedTokenPayLoad;
  keyStore?: IKeyTokenRequestBody;
}
