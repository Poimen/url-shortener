
export class Config {
  constructor(
    public listen_port: number,
    public version: string
  ) { }
}

class AppConfiguration {
  private _config: Config;

  public get config() {
    return this._config;
  }

  constructor() {
    this.loadConfigurationFromEnvironment();
  }

  private loadConfigurationFromEnvironment() {
    this._config = new Config(
      parseInt(process.env.PORT, 10),
      process.env.VERSION
    );
  }
}

export default new AppConfiguration().config;
