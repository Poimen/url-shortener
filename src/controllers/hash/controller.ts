import { Request, Response, NextFunction } from 'express';
import { UrlService } from '@/domain/urlService';
import { useAsyncErrorHandler } from '../async-wrapper';
import { UrlDetail } from '@/domain/models/urlDetail';

const urlService = new UrlService();

export class Controller {
  @useAsyncErrorHandler
  public async index(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (req.params.hash) {
      const url = await urlService.findByHash(req.params.hash);
      if (url !== UrlDetail.Empty) {
        return res.redirect(url.longUrl);
      }
    }
    next();
  }
}

export default new Controller();
