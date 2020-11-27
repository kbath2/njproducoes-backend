import { Router } from 'express';

import CreateUsersService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
  try {
    const { username, name, email, password, preferences, contact } = req.body;

    const createUser = new CreateUsersService();
    const usernames = req.body.username;

    const user = await createUser.execute({
      username,
      name,
      email,
      password,
      preferences,
      contact,
    });

    return res.send(
      `Usuario ${usernames} cadastrado com sucesso no sistema,
      em breve recebera um e-mail para confirmação do cadastro`,
    );
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default usersRouter;
