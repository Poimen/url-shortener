import express from 'express';
import controller from './controller';
import { CreateShortUrlDto } from './models/createShortUrlDto';
import { validateModel } from '../validator';
import { wrapAsync } from '../async-wrapper';

export const router = express.Router()
  .get('', wrapAsync(controller.index))
  .post('/', CreateShortUrlDto.validations, validateModel(), wrapAsync(controller.createShortUrl));
