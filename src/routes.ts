import express from 'express';
import { router as adminRouter } from './controllers/admin/router';

const apiVersion = 'v1';
const apiBasePath = `/api/${apiVersion}`;

export class ApiRoute {
  constructor(
    public path: string,
    public routerCb: express.Router
  ) { }
}

export const apiRoutes = [
  new ApiRoute(`${apiBasePath}/admin`, adminRouter)
];
