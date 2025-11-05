import Joi, { SchemaMap } from "joi";

const schema: SchemaMap = {
  productId: Joi.string().required().messages({
    "string.empty": "Vui lòng gửi lên mã sản phẩm!",
  }),
};

const favoriteDTO = Joi.object(schema);
const unFavoriteDTO = Joi.object(schema);

export { favoriteDTO, unFavoriteDTO };
