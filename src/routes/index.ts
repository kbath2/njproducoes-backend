import { Router } from 'express';

import userSalesRouter from './userSales.routes';

const routes = Router();

routes.use('/userSales', userSalesRouter);

export default routes;
