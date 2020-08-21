import HttpStatusCodes from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

export function wrapAsync(fn: Function) {
  return async function(req: Request, res: Response, next: NextFunction) {
    try {
      return await Promise.resolve(fn(req, res));
    } catch (e) {
      return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
        error: 'Exception: Please contact support team'
      });
    }
  };
}
