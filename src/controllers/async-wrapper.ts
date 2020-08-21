import HttpStatusCodes from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import l from '@/logger';

export function useAsyncErrorHandler(
  target: Object,
  propertyName: string,
  propertyDescriptor: PropertyDescriptor): PropertyDescriptor {
  const method = propertyDescriptor.value;

  propertyDescriptor.value = async function (req: Request, res: Response, next: NextFunction) {
    try {
      return await Promise.resolve(method.apply(this, [req, res, next]));
    } catch (e) {
      l.error(e);
      return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
        error: 'Exception: Please contact support team'
      });
    }
  };
  return propertyDescriptor;
}
