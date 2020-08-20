import { customAlphabet } from 'nanoid/async';
import config from '@/configuration/config';
import { ValidityDate } from './validityDate';
import { CreateShortUrlDto } from '@/controllers/admin/models/createShortUrlDto';

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
    const { shortUrl, shortHash } = await UrlDetail.buildShortUrl(config.baseShortUrl, defaultHashLength);

    return new UrlDetail(createUrl.longUrl, shortUrl, shortHash, new ValidityDate(createUrl.validUntil));
  }

  public isValid(): boolean {
    return (this._validUntil?.isValid() && this._validUntil.isFuture()) || true;
  }

  public async generateNextHash() {
    const { shortUrl, shortHash } = await UrlDetail.buildShortUrl(config.baseShortUrl, defaultHashLength);
    this.shortUrl = shortUrl;
    this.shortHash = shortHash;
  }

  private static async buildShortUrl(baseUrl: string, hashLength: number): Promise<{ shortUrl: string, shortHash: string }> {
    const hash = await generateShortCodeHash(hashLength);
    return {
      shortUrl: `${baseUrl}/${hash}`,
      shortHash: hash
    };
  }
}
