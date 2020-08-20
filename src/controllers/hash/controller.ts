import { Request, Response } from 'express';
import HttpStatusCodes from 'http-status-codes';
import { UrlService } from '@/domain/urlService';

const urlService = new UrlService();

export class Controller {
  public async index(req: Request, res: Response): Promise<void> {
    if (req.params.hash) {

    }
    res.status(HttpStatusCodes.NOT_FOUND);
  }
}

export default new Controller();
