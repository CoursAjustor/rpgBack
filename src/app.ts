import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import { config } from './config/Config';
import { Routes } from './routes';
import { dbInit } from './utils/Database';

export const makeApp = () => {
  const app = express();
  app.use(
    cookieParser(
      'K"Ts2$$b3QeP0E?z{NHm4exo#(l*35GR<S<|@,@>uWG(=RSwI#F5/uv-sUIhWgy',
    ),
  );
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  const routes = new Routes();

  app.use(routes.routes());
  return app;
};

const main = async () => {
  const PORT = config.get('port') || 3000;

  await dbInit();

  const app = makeApp();

  app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
};

main();
