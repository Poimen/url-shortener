import { customAlphabet } from 'nanoid/async';
import { UrlDetail } from './models/urlDetail';
import { IUrlShortenerDb } from '@/infrastructure/IDb';
import { UserUrlDto } from '@/controllers/admin/models/userUrlDto';
import { ValidityDate } from './models/validityDate';

const defaultHashLength = 7;
const defaultLengthAttempts = 3;
const fallbackHashLength = 8;

export class UrlService {
  constructor(
    private _urlStore: IUrlShortenerDb
  ) {
  }

  public async recordShortUrlVersion(userUrl: UserUrlDto): Promise<UrlDetail> {
    for (let i = 0; i < defaultLengthAttempts; ++i) {
      try {
        const urlDetail = await this.attemptUrlStore(userUrl, defaultHashLength);
        return urlDetail;
      }
      catch {
        // TODO - log conflict detection into stats
      }
    }
    // Last attempt at fallback hash length
    const urlDetail = await this.attemptUrlStore(userUrl, fallbackHashLength);
    return urlDetail;
  }

  private async attemptUrlStore(userUrl: UserUrlDto, hashLength: number) {
    const validityDate = new ValidityDate(userUrl.validUntil);
    const hash = await this.generateNewHash(hashLength);
    // TODO - get short baseurl from config
    const urlDetail = new UrlDetail(userUrl.longUrl, this.buildShortUrl('https://short.me', hash), validityDate);

    await this._urlStore.save(urlDetail);

    return urlDetail;
  }

  private generateNewHash(hashLength: number): Promise<string> {
    const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', hashLength);
    return nanoid();
  }

  private buildShortUrl(baseUrl: string, hash: string): string {
    return `${baseUrl}/${hash}`;
  }
}
