import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import { config } from './config/Config';
import { Routes } from './routes';
import { dbInit } from './utils/Database';

const main = async () => {
  const PORT = config.get('port') || 3000;

  const app = express();
  app.use(
    cookieParser(
      'K"Ts2$$b3QeP0E?z{NHm4exo#(l*35GR<S<|@,@>uWG(=RSwI#F5/uv-sUIhWgy',
    ),
  );
  await dbInit();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  const routes = new Routes();

  app.use(routes.routes());

  app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
};

main();
