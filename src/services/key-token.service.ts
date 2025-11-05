import { Types } from "mongoose";
import KeyToken from "../models/refresh-token.model";
import crypto from "crypto";
import { createTokenPair, verifyToken } from "../helpers/jwt.helper";

class KeyTokenService {
  private static createKeyToken = async ({
    userId,
    publicKey,
    refreshToken,
  }: {
    userId: Types.ObjectId;
    publicKey: string;
    refreshToken: string;
  }) => {
    const filter = { userId },
      update = {
        publicKey: publicKey,
        refreshToken: refreshToken,
        refreshTokensUsed: [],
      },
      options = { upsert: true, new: true };

    const tokens = await KeyToken.findOneAndUpdate(filter, update, options);

    return tokens ? tokens.publicKey : null;
  };

  static pairToken = async ({
    userId,
    email,
  }: {
    userId: Types.ObjectId;
    email: string;
  }) => {
    // Created privateKey, publicKey
    const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048, // Độ dài khóa 1024 bit
      publicKeyEncoding: {
        type: "pkcs1", // Chuẩn mã hóa khóa công khai Public Key Cryptography Standards #1
        format: "pem", // Định dạng PEM (Privacy-Enhanced Mail)
      },
      privateKeyEncoding: {
        type: "pkcs1", // Chuẩn mã hóa khóa công khai Public Key Cryptography Standards #1
        format: "pem", // Định dạng PEM (Privacy-Enhanced Mail)
      },
    });

    const privateKeyObject = crypto.createPrivateKey(privateKey);
    // Created token pair
    const tokens = await createTokenPair(
      {
        userId,
        email,
      },
      privateKeyObject
    );

    await this.createKeyToken({
      userId,
      publicKey,
      refreshToken: tokens.refreshToken as string,
    });

    return tokens;
  };

  static verify = (token: string, publicKey: string) => {
    const publicKeyObject = crypto.createPublicKey(publicKey);

    return verifyToken(token, publicKeyObject);
  };

  static findByUserId = async (userId: string) => {
    return await KeyToken.findOne({ userId: new Types.ObjectId(userId) });
  };

  static removeKeyById = async (userId: string) => {
    return await KeyToken.deleteOne({
      userId: new Types.ObjectId(userId),
    });
  };

  static findByRefreshTokensUsed = async (refreshToken: string) => {
    return await KeyToken.findOne({ refreshTokensUsed: refreshToken }).lean();
  };

  static findByRefreshToken = async (refreshToken: string) => {
    return await KeyToken.findOne({ refreshToken: refreshToken });
  };

  static deleteByRefreshToken = async (refreshToken: string) => {
    return await KeyToken.deleteOne({
      refreshToken: refreshToken,
    });
  };

  static deleteByUserId = async (userId: string) => {
    return await KeyToken.deleteOne({
      userId: new Types.ObjectId(userId),
    });
  };
}

export default KeyTokenService;
