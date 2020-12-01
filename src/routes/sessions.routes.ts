import { Router } from 'express';

import AuthUserService from '../services/AuthUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;

    const authenticateUser = new AuthUserService();

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
