import { Router } from 'express';

import AuthUserSalesService from '../services/AuthUserSalesService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  const authenticateUser = new AuthUserSalesService();

  const { user, token } = await authenticateUser.execute({
    username,
    password,
  });

  delete user.password;

  return res.json({ user, token });
});

export default sessionsRouter;
