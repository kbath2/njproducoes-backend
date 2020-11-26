import { Router } from 'express';

import CreateUserSalesService from '../services/CreateUserSalesService';

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
  try {
    const {
      username,
      name,
      cnpj,
      cpf,
      email,
      password,
      preferences,
      contact,
    } = req.body;

    const createUser = new CreateUserSalesService();

    const user = await createUser.execute({
      username,
      name,
      cnpj,
      cpf,
      email,
      password,
      preferences,
      contact,
    });

    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default usersRouter;
