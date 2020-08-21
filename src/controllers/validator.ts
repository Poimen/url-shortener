import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import HttpStatusCodes from 'http-status-codes';

export function validateModel() {
  return function(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }
    next();
  };
}
