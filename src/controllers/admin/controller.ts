import HttpStatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import { UrlService } from '@/domain/urlService';
import { CreateShortUrlDto } from './models/createShortUrlDto';
import { UrlDetail } from '@/domain/models/urlDetail';

const urlService = new UrlService();

export class Controller {
  public async index(req: Request, res: Response): Promise<void> {
    res.json({ hello: 'world' });
  }

  public async createShortUrl(req: Request, res: Response): Promise<void> {
    try {
      const userUrl = new CreateShortUrlDto(req.body.url, req.body.validUntil);
      const url = await urlService.recordShortUrlVersion(userUrl);

      if (url == UrlDetail.Empty) {
          res.status(HttpStatusCodes.CONFLICT).json({ errors: 'Failed to store url' });
      } else {
        res.json({
          logUrl: userUrl.longUrl,
          shortUrl: url.shortUrl
        });
      }
    } catch (e) {
      // TODO - log...
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}

export default new Controller();
