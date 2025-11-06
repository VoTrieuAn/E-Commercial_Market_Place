"use strict";

import { REASON_PHRASES } from "../utils/reason-phrases";
import { STATUS_CODES } from "../utils/status-codes";

abstract class ErrorResponse {
  protected code: number;
  protected status: string;
  protected message: string;
  constructor(message: string, code: number) {
    this.message = message;
    this.code = code;
    this.status = "error";
  }
  getStatus(): number {
    return this.code;
  }
}

class ConflictRequestError extends ErrorResponse {
  constructor(
    message: string = REASON_PHRASES.CONFLICT,
    code: number = STATUS_CODES.CONFLICT
  ) {
    super(message, code);
  }
}

class BadRequestError extends ErrorResponse {
  constructor(
    message: string = REASON_PHRASES.BAD_REQUEST,
    code: number = STATUS_CODES.BAD_REQUEST
  ) {
    super(message, code);
  }
}

class AuthFailedError extends ErrorResponse {
  constructor(
    message: string = REASON_PHRASES.UNAUTHORIZED,
    code: number = STATUS_CODES.UNAUTHORIZED
  ) {
    super(message, code);
  }
}

class NotFoundError extends ErrorResponse {
  constructor(
    message: string = REASON_PHRASES.NOT_FOUND,
    code: number = STATUS_CODES.NOT_FOUND
  ) {
    super(message, code);
  }
}

class ForbiddenError extends ErrorResponse {
  constructor(
    message: string = REASON_PHRASES.FORBIDDEN,
    code: number = STATUS_CODES.FORBIDDEN
  ) {
    super(message, code);
  }
}

class Gone extends ErrorResponse {
  constructor(
    message: string = REASON_PHRASES.GONE,
    code: number = STATUS_CODES.GONE
  ) {
    super(message, code);
  }
}

export {
  ErrorResponse,
  ConflictRequestError,
  BadRequestError,
  AuthFailedError,
  NotFoundError,
  ForbiddenError,
  Gone,
};
