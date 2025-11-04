import { omit, pick } from "lodash";

const removeKeysObject = (object: object, keys: string[]) => {
  return omit(object, keys);
};

const pickKeysObject = (object: object, keys: string[]) => {
  return pick(object, keys);
};

export { removeKeysObject, pickKeysObject };
