import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserSalesService from '../services/CreateUserSalesService';
import ensureAuth from '../middlewares/ensureAuth';

const userSalesRouter = Router();
const upload = multer(uploadConfig);

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

userSalesRouter.patch(
  '/avatar',
  ensureAuth,
  upload.single('avatar'),
  async (req, res) => {
    return res.json({ ok: true });
  },
);

export default userSalesRouter;
