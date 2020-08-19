import mongoose, { Schema } from 'mongoose';
import { nanoid } from 'nanoid';
import config from '@/configuration/config';
import { UrlDetail } from '@/domain/models/urlDetail';
import { IUrlShortenerDb, IDbConnectionFactory } from './IDb';

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
  private _shortModel: mongoose.Model<mongoose.Document, {}>;

  constructor(
    private _connection: mongoose.Connection
  ) {
    const shortsSchema = new Schema({
      _id: {
        type: String,
        default: () => nanoid()
      },
      shortUrl: {
        type: String
      },
      longUrl: {
        type: String
      },
      validUntil: {
        type: Date
      }
    });
    this._shortModel = mongoose.model('short', shortsSchema);
  }

  async save(url: UrlDetail): Promise<void> {
    const instance = new this._shortModel({ shortUrl: url.shortUrl, longUrl: url.longUrl, validUntil: url.validUntil });
    await instance.save();
  }

  getByLongUrl(longUrl: string): Promise<UrlDetail> {
    throw new Error('Method not implemented.');
  }

  get(): Promise<UrlDetail> {
    throw new Error('Method not implemented.');
  }
}


