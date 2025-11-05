import { omit, pick } from "lodash";

// Để loại bỏ các key không cần thiết trong object
const removeKeysObject = (object: Record<string, any>, keys: string[]) => {
  return omit(object, keys);
};

// Để lọc object chỉ với các key cần lấy
const pickKeysObject = (object: object, keys: string[]) => {
  return pick(object, keys);
};

export { removeKeysObject, pickKeysObject };
