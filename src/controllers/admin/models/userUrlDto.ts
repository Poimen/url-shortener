export class UserUrlDto {
  constructor(
    public longUrl: string,
    public validUntil?: string
  ) { }
}
