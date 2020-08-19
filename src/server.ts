import os from 'os';
import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from './configuration/config';
import { apiRoutes } from './routes';

const app = express();

app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: process.env.REQUEST_LIMIT || '100kb' }));

apiRoutes.forEach(route => {
  app.use(route.path, route.routerCb);
});

export function startServer() {
  const welcome = (port: number) => () => console.log(`up and running in ${process.env.NODE_ENV || 'development'} on ${os.hostname()} on port: ${port}`);

  app.listen(config.listen_port, welcome(config.listen_port));
}
