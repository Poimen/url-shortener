import { UrlDetail } from '@/domain/models/urlDetail';

export interface IDbConnectionFactory {
  makeUrlShortener(collection: string): IUrlShortenerDb;
}

export interface IUrlShortenerDb {
  save(url: UrlDetail): Promise<void>;
  get(hash: string): Promise<UrlDetail>;
}
