import express from 'express';
import controller from './controller';

export const router = express.Router()
  .get('/:hash', controller.index);
