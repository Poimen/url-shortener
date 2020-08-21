import { customAlphabet } from 'nanoid/async';
import config from '@/configuration/config';
import { ValidityDate } from './validityDate';
import { CreateShortUrlDto } from '@/controllers/admin/models/createShortUrlDto';
import { IShortUrl } from '@/database/models/shortUrl';

const defaultHashLength = 7;

function generateShortCodeHash(hashLength: number) {
  const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', hashLength);
  return nanoid();
}

export class UrlDetail {
  public static Empty = new UrlDetail('', '', '', ValidityDate.Invalid);

  public get validUntil(): Date|undefined {
    return this._validUntil?.date;
  }

  private constructor(
    public longUrl: string,
    public shortUrl: string,
    public shortHash: string,
    private _validUntil?: ValidityDate
  ) {
  }

  public static async fromCreateUrl(createUrl: CreateShortUrlDto): Promise<UrlDetail> {
    const { shortUrl, shortHash } = await UrlDetail.generateShortUrl(config.baseShortUrl, defaultHashLength);

    return new UrlDetail(createUrl.longUrl, shortUrl, shortHash, new ValidityDate(createUrl.validUntil));
  }

  public static fromDb(model: IShortUrl | null) {
    if (model) {
      return new UrlDetail(model.longUrl, model.shortHash, model.shortUrl, new ValidityDate(model.validUntil));
    }
    return UrlDetail.Empty;
  }

  public isValid(): boolean {
    return (this._validUntil?.isValid() && this._validUntil.isFuture()) || true;
  }

  public async generateNextHash() {
    const { shortUrl, shortHash } = await UrlDetail.generateShortUrl(config.baseShortUrl, defaultHashLength);
    this.shortUrl = shortUrl;
    this.shortHash = shortHash;
  }

  private static async generateShortUrl(baseUrl: string, hashLength: number): Promise<{ shortUrl: string, shortHash: string }> {
    const hash = await generateShortCodeHash(hashLength);
    return {
      shortUrl: UrlDetail.buildShortUrl(baseUrl, hash),
      shortHash: hash
    };
  }

  private static buildShortUrl(baseUrl: string, hash: string) {
    return `${baseUrl}/${hash}`;
  }
}
