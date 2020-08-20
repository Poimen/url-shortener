
export class Config {
  constructor(
    public listenPort: number,
    public version: string,
    public mongodbIP: string,
    public mongoUser: string,
    public mongoPassword: string,
    public baseShortUrl: string
  ) { }
}

class AppConfiguration {
  private _config: Config;

  public get config() {
    return this._config;
  }

  constructor() {
    this._config = new Config(
      parseInt(process.env.PORT || '3000', 10),
      process.env.VERSION || '0.0.0.0',
      process.env.MONGODB_IP || '127.0.0.1',
      process.env.MONGO_USER || '',
      process.env.MONGO_PWD || '',
      process.env.BASE_SHORT_URL || 'http://localhost'
    );
  }
}

export default new AppConfiguration().config;
