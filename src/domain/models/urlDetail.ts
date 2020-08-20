import { ValidityDate } from './validityDate';

export class UrlDetail {
  public static Empty = new UrlDetail('', '', ValidityDate.Invalid);

  public get validUntil(): Date|undefined {
    return this._validUntil?.date;
  }

  constructor(
    public longUrl: string,
    public shortUrl: string,
    private _validUntil?: ValidityDate
  ) {
  }

  public isValid(): boolean {
    return (this._validUntil?.isValid() && this._validUntil.isFuture()) || true;
  }

  public generateShortCodeHash() {

  }
}
