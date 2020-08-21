import { UrlDetail } from './models/urlDetail';
import { CreateShortUrlDto } from '@/controllers/admin/models/createShortUrlDto';
import ShortUrl from '@/database/models/shortUrl';
import l from '@/logger';

const storageLengthAttempts = 3;

export class UrlService {
  public async recordShortUrl(urlCreation: CreateShortUrlDto): Promise<UrlDetail> {
    const urlDetail = await UrlDetail.fromCreateUrl(urlCreation);
    const resultantDetails = await this.safeStoreUrl(urlDetail);
    return resultantDetails ? resultantDetails : UrlDetail.Empty;
  }

  public async findByHash(hash: string) {
    const urlDetail = await this.findUrlFromHash(hash);
    if (urlDetail.isValid()) {
      return urlDetail;
    }
    return UrlDetail.Empty;
  }

  private async safeStoreUrl(urlDetail: UrlDetail): Promise<UrlDetail | undefined> {
    for (let i = 0; i < storageLengthAttempts; ++i) {
      try {
        await this.attemptUrlStore(urlDetail);
        return urlDetail;
      }
      catch {
        // TODO - log conflict detection into stats
        l.warn(`CONFLICT in URL generation at iteration: ${i}`);
      }
    }
    return undefined;
  }

  private async attemptUrlStore(urlDetail: UrlDetail) {
    const shortModel = new ShortUrl({ longUrl: urlDetail.longUrl, shortHash: urlDetail.shortHash, validUntil: urlDetail.validUntil });
    await shortModel.save();
  }

  private async findUrlFromHash(urlHashCode: string): Promise<UrlDetail> {
    const shortModel = await ShortUrl.findOne({ shortHash: urlHashCode });
    return UrlDetail.fromDb(shortModel);
  }
}
