import isAfter from 'date-fns/isAfter';
import parse from 'date-fns/parse';

export class ValidityDate {
  private _date?: Date;

  public static Invalid: ValidityDate = new ValidityDate();

  public get date(): Date | undefined {
    return this._date;
  }

  constructor(
    date?: Date | string
  ) {
    if (date) {
      const stringifiedDate = date.toString();
      this._date = parse(stringifiedDate, 'yyyy-MM-dd', new Date());
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
