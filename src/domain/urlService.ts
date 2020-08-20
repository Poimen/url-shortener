import { UrlDetail } from './models/urlDetail';
import { CreateShortUrlDto } from '@/controllers/admin/models/createShortUrlDto';
import ShortUrl from '@/database/models/shortUrl';

const storageLengthAttempts = 3;

export class UrlService {
  public async recordShortUrlVersion(urlCreation: CreateShortUrlDto): Promise<UrlDetail> {
    const urlDetail = await UrlDetail.fromCreateUrl(urlCreation);
    const resultantDetails = await this.safeTryStoreUrl(urlDetail);
    return resultantDetails ? resultantDetails : UrlDetail.Empty;
  }

  private async safeTryStoreUrl(urlDetail: UrlDetail): Promise<UrlDetail|undefined> {
    for (let i = 0; i < storageLengthAttempts; ++i) {
      try {
        await this.attemptUrlStore(urlDetail);
        return urlDetail;
      }
      catch {
        // TODO - log conflict detection into stats
      }
    }
    return undefined;
  }

  private async attemptUrlStore(urlDetail: UrlDetail) {
    const shortModel = new ShortUrl({ longUrl: urlDetail.longUrl, shortUrl: urlDetail.shortUrl, validUntil: urlDetail.validUntil });
    await shortModel.save();
  }
}
