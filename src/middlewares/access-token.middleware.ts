import { NextFunction, Request, Response } from "express";
import { AuthFailedError } from "../core/error.response";
import KeyTokenService from "../services/key-token.service";
import {
  IAuthRequest,
  IDecodedTokenPayLoad,
} from "../models/interfaces/auth.interface";
import { IKeyTokenRequestBody } from "../models/interfaces/key-token.request";

export const accessTokenMiddleware = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) => {
  const clientId = req.headers["x-client-id"] as string;
  const accessToken = (req.headers["authorization"] as string).split(" ")[1];

  if (!accessToken || !clientId) {
    throw new AuthFailedError("Yêu cầu không hợp lệ");
  }

  const keyStore = await KeyTokenService.findByUserId(clientId);

  if (!keyStore) {
    throw new AuthFailedError("Yêu cầu không hợp lệ");
  }

  const { userId, publicKey } = keyStore;

  const decoded = await KeyTokenService.verify(accessToken, publicKey);

  if (userId.toString() !== decoded.userId) {
    throw new AuthFailedError("Yêu cầu không hợp lệ");
  }

  req.keyStore = keyStore as IKeyTokenRequestBody;
  req.decodeUser = decoded as IDecodedTokenPayLoad;

  next();
};
