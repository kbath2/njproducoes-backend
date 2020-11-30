import { request, Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUsersService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import ensureAuth from '../middlewares/ensureAuth';

const usersRouter = Router();
const upload = multer(uploadConfig);

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

usersRouter.patch(
  '/avatar',
  ensureAuth,
  upload.single('avatar'),
  async (req, res) => {
    try {
      const updateUserAvatar = new UpdateUserAvatarService();

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

export default usersRouter;
