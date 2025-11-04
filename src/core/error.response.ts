"use strict";

import { REASON_PHRASES } from "../utils/reason-phrases";
import { STATUS_CODES } from "../utils/status-codes";

abstract class ErrorResponse {
  protected status: number;
  protected message: string;
  constructor(message: string, status: number) {
    this.message = message;
    this.status = status;
  }
  getStatus(): number {
    return this.status;
  }
}

class ConflictRequestError extends ErrorResponse {
  constructor(
    message: string = REASON_PHRASES.CONFLICT,
    status: number = STATUS_CODES.CONFLICT
  ) {
    super(message, status);
  }
}

class BadRequestError extends ErrorResponse {
  constructor(
    message: string = REASON_PHRASES.BAD_REQUEST,
    status: number = STATUS_CODES.BAD_REQUEST
  ) {
    super(message, status);
  }
}

class AuthFailedError extends ErrorResponse {
  constructor(
    message: string = REASON_PHRASES.UNAUTHORIZED,
    status: number = STATUS_CODES.UNAUTHORIZED
  ) {
    super(message, status);
  }
}

class NotFoundError extends ErrorResponse {
  constructor(
    message: string = REASON_PHRASES.NOT_FOUND,
    status: number = STATUS_CODES.NOT_FOUND
  ) {
    super(message, status);
  }
}

class ForbiddenError extends ErrorResponse {
  constructor(
    message: string = REASON_PHRASES.FORBIDDEN,
    status: number = STATUS_CODES.FORBIDDEN
  ) {
    super(message, status);
  }
}

class Gone extends ErrorResponse {
  constructor(
    message: string = REASON_PHRASES.GONE,
    status: number = STATUS_CODES.GONE
  ) {
    super(message, status);
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
