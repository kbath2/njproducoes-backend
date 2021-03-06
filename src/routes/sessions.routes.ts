import { Router } from 'express';

import AuthUserService from '../services/AuthUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const authenticateUser = new AuthUserService();

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  delete user.password;

  return res.json({ user, token });
});

export default sessionsRouter;
