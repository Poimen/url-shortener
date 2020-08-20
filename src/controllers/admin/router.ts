import express from 'express';
import controller from './controller';
import { CreateShortUrlDto } from './models/createShortUrlDto';
import { createValidationMiddleware } from '../validator';

export const router = express.Router()
  .get('', controller.index)
  .post('/', CreateShortUrlDto.validations, createValidationMiddleware(), controller.createShortUrl);
