import isAfter from 'date-fns/isAfter';
import parse from 'date-fns/parse';

export class ValidityDate {
  private _date?: Date;

  public static Invalid: ValidityDate = new ValidityDate();

  constructor(
    date?: string
  ) {
    if (date) {
      this._date = parse(date, 'yyyy-MM-dd', new Date());
    }
  }

  public isFuture(): boolean {
    if (this._date) {
      return isAfter(this._date, new Date());
    }
    return false;
  }

  public isValid(): boolean {
    return this._date !== undefined;
  }
}
