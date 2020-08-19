
export class Config {
  constructor(
    public listen_port: number,
    public version: string,
    public mongodb_ip: string
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
      process.env.MONGODB_IP || '127.0.0.1'
    );
  }
}

export default new AppConfiguration().config;
