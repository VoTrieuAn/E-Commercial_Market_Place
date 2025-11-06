import Joi, { SchemaMap } from "joi";

const schemaRegister: SchemaMap = {
  name: Joi.string().min(2).max(150).required().messages({
    "string.min": "Tên phải có ít nhất 2 ký tự",
    "string.max": "Tên không được vượt quá 150 ký tự",
    "any.required": "Tên không được để trống",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email không hợp lệ",
    "any.required": "Email không được để trống",
  }),
  password: Joi.string()
    .min(8)
    .required()
    .custom((value, helpers) => {
      if (!/[A-Z]/.test(value)) {
        return helpers.error("password.uppercase");
      }
      if (!/[a-z]/.test(value)) {
        return helpers.error("password.lowercase");
      }
      if (!/[\d]/.test(value)) {
        return helpers.error("password.number");
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        return helpers.error("password.special");
      }
      return value;
    })
    .messages({
      "string.empty": "Vui lòng nhập mật khẩu!",
      "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự!",
      "password.uppercase": "Mật khẩu phải chứa ít nhất một chữ cái viết hoa!",
      "password.lowercase":
        "Mật khẩu phải chứa ít nhất một chữ cái viết thường!",
      "password.number": "Mật khẩu phải chứa ít nhất một chữ số!",
      "password.special": "Mật khẩu phải chứa ít nhất một ký tự đặc biệt!",
    }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Mật khẩu không khớp",
    "any.required": "Vui lòng xác nhận mật khẩu",
  }),
};

const schemaLogin: SchemaMap = {
  email: Joi.string().email().required().messages({
    "string.email": "Email không hợp lệ",
    "any.required": "Email không được để trống",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Vui lòng nhập mật khẩu!",
  }),
};

const schemaForgotPassword: SchemaMap = {
  email: Joi.string().email().required().messages({
    "string.email": "Email không hợp lệ",
    "any.required": "Email không được để trống",
  }),
  password: Joi.string()
    .min(8)
    .required()
    .custom((value, helpers) => {
      if (!/[A-Z]/.test(value)) {
        return helpers.error("password.uppercase");
      }
      if (!/[a-z]/.test(value)) {
        return helpers.error("password.lowercase");
      }
      if (!/[\d]/.test(value)) {
        return helpers.error("password.number");
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        return helpers.error("password.special");
      }
      return value;
    })
    .messages({
      "string.empty": "Vui lòng nhập mật khẩu!",
      "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự!",
      "password.uppercase": "Mật khẩu phải chứa ít nhất một chữ cái viết hoa!",
      "password.lowercase":
        "Mật khẩu phải chứa ít nhất một chữ cái viết thường!",
      "password.number": "Mật khẩu phải chứa ít nhất một chữ số!",
      "password.special": "Mật khẩu phải chứa ít nhất một ký tự đặc biệt!",
    }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Mật khẩu không khớp",
    "any.required": "Vui lòng xác nhận mật khẩu",
  }),
};

const registerDTO = Joi.object(schemaRegister);

const loginDTO = Joi.object(schemaLogin);

const forgotPasswordDTO = Joi.object(schemaForgotPassword);

const refreshTokenDTO = Joi.object({
  refreshToken: Joi.string().required().messages({
    "string.empty": "Vui lòng cung cấp refresh token!",
    "any.required": "Refresh token là bắt buộc!",
  }),
});

export { registerDTO, loginDTO, refreshTokenDTO, forgotPasswordDTO };
