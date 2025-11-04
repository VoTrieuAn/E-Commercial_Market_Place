import { Response } from "express";

const STATUS_CODE = {
  OK: 200,
  CREATED: 201,
};

const REASON_STATUS_CODE = {
  OK: "Success",
  CREATED: "Created successfully",
};

type TSuccessResponse = {
  status?: number;
  message?: string;
  metadata?: Record<string, any>;
  options?: Record<string, any>;
};
class SuccessResponse {
  protected status: number;
  protected message: string;
  protected metadata: Record<string, any>;
  constructor({
    status = STATUS_CODE.OK,
    message = REASON_STATUS_CODE.OK,
    metadata = {},
  }: TSuccessResponse) {
    this.status = status;
    this.message = message;
    this.metadata = metadata;
  }

  private send(res: Response) {
    res.status(this.status).json(this);
    return;
  }

  static create(
    { message, status, metadata }: TSuccessResponse = {},
    res: Response
  ) {
    return new this({ message, status, metadata }).send(res);
  }
}

class OK extends SuccessResponse {
  constructor({
    message = REASON_STATUS_CODE.OK,
    metadata = {},
  }: TSuccessResponse) {
    super({ message, metadata });
  }
}

class Created extends SuccessResponse {
  options: Record<string, any>;
  constructor({
    message = REASON_STATUS_CODE.CREATED,
    status = STATUS_CODE.CREATED,
    metadata = {},
    options = {},
  }: TSuccessResponse) {
    super({
      message,
      metadata,
      status,
    });
    this.options = options;
  }
}

export { SuccessResponse, OK, Created };
