import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';

import Users from '../model/Users';

interface Request {
  username: string;
  password: string;
}

interface Response {
  user: Users;
}

class AuthenticateUserService {
  public async execute({ username, password }: Request): Promise<Response> {
    const usersRepository = getRepository(Users);

    const user = await usersRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new Error('Username/Password invalido');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Email/Password invalido');
    }

    return {
      user,
    };
  }
}

export default AuthenticateUserService;
