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

    // Validações
    const checkEmailExists = await userSalesRepository.findOne({
      where: { email },
    });

    if (checkEmailExists) {
      throw new Error('Email já cadastrado no sistema');
    }

    const checkCnpjExists = await userSalesRepository.findOne({
      where: { cnpj },
    });

    if (checkCnpjExists) {
      throw new Error('CNPJ já cadastrado no sistema');
    }

    const checkCpfExists = await userSalesRepository.findOne({
      where: { cpf },
    });

    if (checkCpfExists) {
      throw new Error('CPF já cadastrado no sistema');
    }

    const checkUsernameExists = await userSalesRepository.findOne({
      where: { username },
    });

    if (checkUsernameExists) {
      throw new Error('Username já cadastrado no sistema');
    }
    // fim das validações

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
