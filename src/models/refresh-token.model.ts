"use strict";

import { Schema, model } from "mongoose";

// Declare the Schema of the Mongo model
const keyTokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    publicKey: {
      type: String,
      required: true,
      unique: true,
    },
    // Những token đã sử dụng, để check nghi vấn sử dụng lại
    refreshTokensUsed: {
      type: Array,
      default: [],
    },
    // Token mới nhất, đang sử dụng
    refreshToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
    collection: "key_tokens,", // Specify the collection name
  }
);

//Export the model

const KeyToken = model("KeyToken", keyTokenSchema, "key_tokens");

export default KeyToken;
