import mongoose from 'mongoose';
import config from '@/configuration/config';
import { UrlDetail } from '@/domain/models/urlDetail';
import { IUrlShortenerDb, IDbConnectionFactory } from './IDb';

const mongoConnectionString = (collection: string) => `mongodb://${config.mongodb_ip}/${collection}`;

export class MongoDatabaseConnector implements IDbConnectionFactory {
  public makeUrlShortener(collection: string): IUrlShortenerDb {
    mongoose.connect(mongoConnectionString(collection), { useNewUrlParser: true, useUnifiedTopology: true });
    return new MongoDbCollection(mongoose.connection);
  }
}

export class MongoDbCollection implements IUrlShortenerDb {
  constructor(
    private _connection: mongoose.Connection
  ) {
  }

  async save(url: UrlDetail): Promise<void> {
  }

  getByLongUrl(longUrl: string): Promise<UrlDetail> {
    throw new Error('Method not implemented.');
  }

  get(): Promise<UrlDetail> {
    throw new Error('Method not implemented.');
  }
}


