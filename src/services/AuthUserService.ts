import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';

import Users from '../model/Users';

interface Request {
  username: string;
  password: string;
}
interface Response {
  user: Users;
  token: string;
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

    const token = sign({}, '3f5ade7fc584598768daf4f69c9d593e', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
