import { Router } from 'express';

import userSalesRouter from './userSales.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/userSales', userSalesRouter);
routes.use('/user', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
