import { Types } from "mongoose";
import {
  AuthFailedError,
  BadRequestError,
  NotFoundError,
} from "../core/error.response";
import { IDecodedTokenPayLoad } from "../models/interfaces/auth.interface";
import { IKeyTokenRequestBody } from "../models/interfaces/key-token.request";
import KeyTokenService from "./key-token.service";
import UserService from "./user.service";
import { compareSync, hash } from "bcryptjs";
import { pickKeysObject } from "../utils/lodash.util";

class AccessService {
  static refreshToken = async ({
    refreshToken,
    keyStore,
    user,
  }: {
    refreshToken: string;
    keyStore: IKeyTokenRequestBody;
    user: IDecodedTokenPayLoad;
  }) => {
    const { userId, email } = user;

    // 3. Tìm kiếm shop theo email
    const foundUser = await UserService.getByEmail(email);

    if (!foundUser) {
      throw new AuthFailedError("User không tồn tại!");
    }

    // 4. Create 1 pair token
    const tokens = await KeyTokenService.pairToken({
      userId: new Types.ObjectId(userId),
      email,
    });

    // 5. Update refresh_tokens_used add old refresh_token
    await keyStore.updateOne({
      $set: {
        refreshToken: tokens.refreshToken,
      },
      $addToSet: {
        refreshTokensUsed: refreshToken,
      },
    });

    return {
      user: pickKeysObject(foundUser, ["_id", "name", "email"]),
      tokens,
    };
  };

  static signUp = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    const holderUser = await UserService.getByEmail(email);

    if (holderUser) {
      throw new BadRequestError("Email đã được sử dụng!");
    }
    const passwordHash = await hash(password, 10); // Mã hóa mật khẩu
    const newUser = await UserService.create({
      name,
      email,
      password: passwordHash,
    });

    if (newUser) {
      // Tạo token pair
      const tokens = await KeyTokenService.pairToken({
        userId: newUser._id,
        email: newUser.email as string,
      });
      return {
        user: pickKeysObject(newUser, ["_id", "name", "email"]),
        tokens,
      };
    }
  };

  /**
   * 1 - Check email in dbs
   * 2 - Match password
   * 3 - Create token pair (accessToken, refreshToken)
   * 4 - Generate tokens
   * 5 - Get data return login
   */
  static login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    // 1.
    const foundUser = await UserService.getByEmail(email);
    if (!foundUser) {
      throw new NotFoundError("User không tồn tại!");
    }

    // 2.
    const match = compareSync(password, foundUser.password as string);
    if (!match) {
      throw new AuthFailedError("User không được ủy quyền!");
    }

    // 3.
    const tokens = await KeyTokenService.pairToken({
      userId: foundUser._id as Types.ObjectId,
      email: foundUser.email as string,
    });

    return {
      user: pickKeysObject(foundUser, ["_id", "name", "email"]),
      tokens,
    };
  };

  static logout = async (keyToken: IKeyTokenRequestBody) => {
    const delKey = await KeyTokenService.removeKeyById(
      keyToken.userId.toString()
    );

    return { delKey };
  };
}

export default AccessService;
