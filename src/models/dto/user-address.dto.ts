import Joi, { SchemaMap } from "joi";

const schema: SchemaMap = {
  phone: Joi.string()
    .optional()
    .custom((value, helpers) => {
      // Loại bỏ khoảng trắng và dấu gạch ngang (nếu có) trước khi kiểm tra
      const cleanValue = value.replace(/[\s-]/g, "");

      // Regex kiểm tra số điện thoại di động 10 số, bắt đầu bằng 0
      // Ví dụ: 0901234567, 0398765432
      const VN_PHONE_REGEX = /^0(3|5|7|8|9)[0-9]{8}$/;

      if (!VN_PHONE_REGEX.test(cleanValue)) {
        // Trả về lỗi nếu không khớp
        return helpers.error("phone.invalidFormat");
      }

      // Trả về giá trị đã làm sạch nếu hợp lệ
      return cleanValue;
    })
    .messages({
      "phone.invalidFormat": "Số điện thoại không đúng định dạng!", // Lỗi chung cho pattern (regex)
    }),
  address: Joi.string().min(1).max(50).required(),
  ward: Joi.string().min(1).max(50).required(),
  district: Joi.string().min(1).max(50).required(),
  city: Joi.string().min(1).max(50).required(),
};

const createUserAddressDTO = Joi.object(schema);
const updateUserAddressDTO = Joi.object(schema);

export { createUserAddressDTO, updateUserAddressDTO };
