import * as dotenv from 'dotenv';

class Config {
  [key: string]: any;

  constructor() {
    dotenv.config();
  }

  get(configKey: string) {
    return this[configKey];
  }

  load() {
    this.dbName = process.env.DB_NAME ?? '';
    this.dbPort = process.env.DB_PORT ?? '';
    this.dbUrl = process.env.DB_URL ?? '';
    this.dbUser = process.env.DB_USER ?? '';
    this.dbPassword = process.env.DB_PASSWORD ?? '';
    this.port = process.env.PORT ?? '';
  }
}

const config = new Config();

config.load();

export { config };
