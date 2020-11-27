import { Router } from 'express';

import CreateUserSalesService from '../services/CreateUserSalesService';

const userSalesRouter = Router();

userSalesRouter.post('/', async (req, res) => {
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

    const createUserSales = new CreateUserSalesService();
    const usernames = req.body.username;

    const user = await createUserSales.execute({
      username,
      name,
      cnpj,
      cpf,
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

export default userSalesRouter;