import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';

import authConfig from '../config/auth';
import Users from '../model/Users';
import AppError from '../err/AppError';

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
      throw new AppError('Username/Password invalido', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Username/Password invalido', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
