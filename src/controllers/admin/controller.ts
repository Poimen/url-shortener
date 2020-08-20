import { Request, Response } from 'express';
import { MongoDatabaseConnector } from '../../infrastructure/mongodb';
import { UrlService } from '@/domain/urlService';
import { CreateShortUrlDto } from './models/createShortUrlDto';
import { validationResult } from 'express-validator';

const databaseConnector = new MongoDatabaseConnector();
const urlService = new UrlService(databaseConnector.makeUrlShortener('url-shortener'));

export class Controller {
  public async index(req: Request, res: Response): Promise<void> {
    res.json({ hello: 'world' });
  }

  public async createShortUrl(req: Request, res: Response): Promise<void> {
  //   CreateShortUrlDtoValidator.validate();
  //   const errors = validationResult(req);
  //   console.dir(errors);
  //   if (!errors.isEmpty()) {
  //     res
  // //      .status(HttpStatusCodes.BAD_REQUEST)
  //       .status(400)
  //       .json({ errors: errors.array() });
  //     return;
  //   }


    // TODO - add try/catch for common error handling
    const userUrl = new CreateShortUrlDto(req.body.url, req.body.validUntil);
    const url = await urlService.recordShortUrlVersion(userUrl);

    res.json({
      logUrl: userUrl.longUrl,
      shortUrl: url.shortUrl
    });
  }
}

export default new Controller();
