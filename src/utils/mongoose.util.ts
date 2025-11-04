import { Schema } from "mongoose";

export const formatStringIdToObjectId = (id: string) => {
  return new Schema.Types.ObjectId(id);
};
