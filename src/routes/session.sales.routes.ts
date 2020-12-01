import { Router } from 'express';

import AuthUserSalesService from '../services/AuthUserSalesService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;

    const authenticateUser = new AuthUserSalesService();

    const { user, token } = await authenticateUser.execute({
      username,
      password,
    });

    delete user.password;

    return res.json({ user, token });
  } catch (err) {
    return res.status(err.statusCode).json({ error: err.message });
  }
});

export default sessionsRouter;
