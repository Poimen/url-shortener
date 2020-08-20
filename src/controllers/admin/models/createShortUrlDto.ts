import { validationResult, body, check } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export class CreateShortUrlDto {
  constructor(
    public longUrl: string,
    public validUntil?: string
  ) {
  }

  public static get validations() {
    return [
      check('url', 'Please provide valid url').isURL().trim(),
      check('validUntil', 'Please use format dd/MM/YYYY').optional().isDate()
    ];
  }
}
