import { Request, Response } from 'express';
import { MongoDatabaseConnector } from '../../infrastructure/mongodb';
import { UrlService } from '@/domain/urlService';
import { UserUrlDto } from './models/userUrlDto';

const databaseConnector = new MongoDatabaseConnector();
const urlService = new UrlService(databaseConnector.makeUrlShortener('url-shortener'));

export class Controller {

  public async index(req: Request, res: Response): Promise<void> {
    res.json({ hello: 'world' });
  }

  public async addLongUrl(req: Request, res: Response): Promise<void> {
    const userUrl = new UserUrlDto(req.body.url, req.body.validUntil);
    const url = await urlService.recordShortUrlVersion(userUrl);
    res.json(url);
  }
}

export default new Controller();
