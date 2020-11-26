import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import UserSales from '../model/UserSales';

interface Request {
  username: string;
  name: string;
  cnpj: string;
  cpf: string;
  email: string;
  password: string;
  preferences: string;
  contact: string;
}

class CreateUserSalesService {
  public async execute({
    username,
    name,
    cnpj,
    cpf,
    email,
    password,
    preferences,
    contact,
  }: Request): Promise<UserSales> {
    const userSalesRepository = getRepository(UserSales);

    const checkEmailExists = await userSalesRepository.findOne({
      where: { email },
    });

    if (checkEmailExists) {
      throw new Error('Email já cadastrado');
    }

    const hashedPassword = await hash(password, 8);

    const userCreate = userSalesRepository.create({
      username,
      name,
      cnpj,
      cpf,
      email,
      password: hashedPassword,
      preferences,
      contact,
    });

    await userSalesRepository.save(userCreate);

    return userCreate;
  }
}

export default CreateUserSalesService;
