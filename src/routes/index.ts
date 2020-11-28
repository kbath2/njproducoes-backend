import { Router } from 'express';

import userSalesRouter from './userSales.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import sessionSalesRouter from './session.sales.routes';

const routes = Router();

routes.use('/userSales', userSalesRouter);
routes.use('/user', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/sessionSales', sessionSalesRouter);

export default routes;
