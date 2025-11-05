import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../core/error.response";
import { STATUS_CODES } from "../utils/status-codes";
import { omit } from "lodash";

const defaultErrorRequestHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ErrorResponse) {
    res.status(err.getStatus()).json(omit(err, ["status"]));
    return;
  }

  const finalError: any = {};

  Object.getOwnPropertyNames(err).forEach((key) => {
    Object.getOwnPropertyDescriptor(err, key);
    /**
     * Object.getOwnPropertyDescriptor
     * Lấy metadata (descriptor) của một property, gồm:
     *    configurable → có thể thay đổi descriptor hoặc xóa property không
     *    writable → có thể gán giá trị mới không
     *    enumerable → có xuất hiện khi duyệt for...in hoặc JSON.stringify không
     *    value → giá trị của property
     */

    if (
      !Object.getOwnPropertyDescriptor(err, key)?.configurable ||
      !Object.getOwnPropertyDescriptor(err, key)?.writable
    ) {
      return;
    }
    Object.defineProperty(err, key, { enumerable: true }); // enumerable để có thể hiển thị trong JSON
    finalError[key] = err[key];
  });

  res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
    message: finalError.message,
    errorInfo: omit(finalError, ["stack"]), // omit để loại bỏ stack trace khỏi response
  });
  return;
};

export default defaultErrorRequestHandler;
