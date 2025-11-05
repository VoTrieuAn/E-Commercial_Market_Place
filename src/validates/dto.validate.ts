import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { STATUS_CODES } from "../utils/status-codes";

export const validateDTO = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        status: "error",
        code: STATUS_CODES.BAD_REQUEST,
        message: error?.details[0].message,
      });
    }
    next();
  };
};
