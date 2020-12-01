import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import Users from '../model/Users';
import AppError from '../err/AppError';

interface Request {
  username: string;
  name: string;
  email: string;
  password: string;
  preferences: string;
  contact: string;
}

class CreateUsersService {
  public async execute({
    username,
    name,
    email,
    password,
    preferences,
    contact,
  }: Request): Promise<Users> {
    const usersRepository = getRepository(Users);

    // Validações
    const checkEmailExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkEmailExists) {
      throw new AppError('Email já cadastrado no sistema');
    }

    const checkUsernameExists = await usersRepository.findOne({
      where: { username },
    });

    if (checkUsernameExists) {
      throw new AppError('Username já cadastrado no sistema');
    }
    // fim das validações

    const hashedPassword = await hash(password, 8);

    const userCreate = usersRepository.create({
      username,
      name,
      email,
      password: hashedPassword,
      preferences,
      contact,
    });

    await usersRepository.save(userCreate);

    return userCreate;
  }
}

export default CreateUsersService;
