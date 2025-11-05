import { Document, Types } from "mongoose";

export interface IKeyTokenRequestBody extends Document {
  userId: Types.ObjectId;
  publicKey: string;
  refreshToken: string;
  refreshTokensUsed: string[];
}
