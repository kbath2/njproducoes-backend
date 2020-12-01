import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserSalesService from '../services/CreateUserSalesService';
import ensureAuth from '../middlewares/ensureAuth';
import UpUserSalesAvatarService from '../services/UpdateUserSalesAvatarService';

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
    try {
      const updateUserAvatar = new UpUserSalesAvatarService();

      const user = await updateUserAvatar.execute({
        user_id: req.user.id,
        avatarFilename: req.file.filename,
      });

      delete user.password;

      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },
);

export default userSalesRouter;
