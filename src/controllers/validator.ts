import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
// import HttpStatusCodes from "http-status-codes";

export function createValidationMiddleware() {
  return function(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    console.dir(errors);
    if (!errors.isEmpty()) {
      return res
  //      .status(HttpStatusCodes.BAD_REQUEST)
        .status(400)
        .json({ errors: errors.array() });
    }

    next();
  };
}
