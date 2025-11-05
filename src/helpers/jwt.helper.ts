import { KeyObject } from "crypto";
import { JwtPayload, sign, verify } from "jsonwebtoken";

export const createTokenPair = (
  payload: Record<string, any>,
  privateKey: KeyObject
): Promise<{
  accessToken: string;
  refreshToken: string;
}> => {
  // AccessToken thông qua privateKey
  const accessToken = sign(payload, privateKey, {
    algorithm: "RS256",
    expiresIn: "1h", // Thời gian hết hạn 1 giờ
  });

  const refreshToken = sign(payload, privateKey, {
    algorithm: "RS256",
    expiresIn: "7d", // Thời gian hết hạn 30 ngày
  });

  return Promise.resolve({
    accessToken,
    refreshToken,
  });
};

export const verifyToken = (
  token: string,
  publicKey: KeyObject
): Promise<any> => {
  return new Promise((resolve, reject) => {
    verify(token, publicKey, { algorithms: ["RS256"] }, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded);
    });
  });
};
