import { Router } from 'express';

import userSalesRouter from './userSales.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/userSales', userSalesRouter);
routes.use('/user', usersRouter);

export default routes;
