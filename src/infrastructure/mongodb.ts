import mongoose from 'mongoose';
import config from '@/configuration/config';
import { UrlDetail } from '@/domain/models/urlDetail';
import { IUrlShortenerDb, IDbConnectionFactory } from './IDb';
import { shortsModel, IShort } from '@/database/shorts';

const mongoConnectionString = (collection: string) => `mongodb://${config.mongodbIP}/${collection}`;

export class MongoDatabaseConnector implements IDbConnectionFactory {
  public makeUrlShortener(collection: string): IUrlShortenerDb {
    mongoose.connect(mongoConnectionString(collection), { useNewUrlParser: true, useUnifiedTopology: true, user: config.mongoUser, pass: config.mongoPassword });

    mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
    mongoose.connection.once('open', function() {
      console.log('MongoDB database connection established successfully');
    });
    return new MongoDbCollection(mongoose.connection);
  }
}

export class MongoDbCollection implements IUrlShortenerDb {
  private _shortModel: mongoose.Model<mongoose.Document, IShort>;

  constructor(
    private _connection: mongoose.Connection
  ) {
    this._shortModel = shortsModel;
  }

  async save(url: UrlDetail): Promise<void> {
    const instance = new this._shortModel({ shortUrl: url.shortUrl, longUrl: url.longUrl, validUntil: url.validUntil });
    await instance.save();
  }

  get(): Promise<UrlDetail> {
    throw new Error('Method not implemented.');
  }
}


