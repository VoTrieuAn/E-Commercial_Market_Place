import { Request, Response, NextFunction } from "express";

function serializeError(err: any) {
  const out: any = {
    message: err?.message || "Internal Server Error",
  };
  if (err?.name) out.name = err.name;
  if (err?.code) out.code = err.code;
  if (process.env.NODE_ENV !== "production") {
    out.stack = err?.stack;
    if (err?.details) out.details = err.details;
  }
  return out;
}

export default function defaultErrorRequestHandler(
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  // server log (full err for debugging). Do NOT return full err to client.
  console.error("Unhandled error:", err);

  const status = err?.status || err?.statusCode || 500;
  const body = {
    code: status,
    status: "error",
    ...serializeError(err),
  };

  return res.status(status).json(body);
}
