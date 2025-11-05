import Joi, { SchemaMap } from "joi";

const schema: SchemaMap = {
  name: Joi.string().min(2).max(150).required().messages({
    "string.min": "Tên phải có ít nhất 2 ký tự",
    "string.max": "Tên không được vượt quá 150 ký tự",
    "any.required": "Tên không được để trống",
  }),
  dateOfBirth: Joi.date().optional(),
  gender: Joi.string().valid("male", "female", "other").default("male"),
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
};

const updateUserDTO = Joi.object(schema);

export { updateUserDTO };
