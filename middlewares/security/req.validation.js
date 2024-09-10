import { validationResult } from "express-validator";
import createHttpError from "http-errors";

export function reqValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(createHttpError.BadRequest(errors.array()));
    return;
  }
  next();
}
