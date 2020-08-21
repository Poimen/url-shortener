import HttpStatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import { UrlService } from '@/domain/urlService';
import { CreateShortUrlDto } from './models/createShortUrlDto';
import { UrlDetail } from '@/domain/models/urlDetail';
import { useAsyncErrorHandler } from '../async-wrapper';

const urlService = new UrlService();

export class Controller {
  @useAsyncErrorHandler
  public async index(req: Request, res: Response): Promise<void> {
    throw new Error('Not implemented');
  }

  @useAsyncErrorHandler
  public async createShortUrl(req: Request, res: Response): Promise<void> {
    const userUrl = new CreateShortUrlDto(req.body.url, req.body.validUntil);
    const url = await urlService.recordShortUrl(userUrl);

    if (url == UrlDetail.Empty) {
      res.status(HttpStatusCodes.CONFLICT).json({ errors: 'Failed to store url' });
    } else {
      res.json({
        logUrl: userUrl.longUrl,
        shortUrl: url.shortUrl
      });
    }
  }
}

export default new Controller();
