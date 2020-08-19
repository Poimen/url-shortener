import { ValidityDate } from './validityDate';

export class UrlDetail {
  // TODO - set to min date
  public static Empty = new UrlDetail('', '', ValidityDate.Invalid);

  constructor(
    public longUrl: string,
    public shortUrl: string,
    public validUntil?: ValidityDate
  ) {}

  public isValid(): boolean {
    return (this.validUntil?.isValid() && this.validUntil.isFuture()) || true;
  }
}
