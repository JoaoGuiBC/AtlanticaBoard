import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { prisma } from '@database/prismaClient';
import authConfig from 'src/config/auth';

interface AuthenticateParams {
  email: string;
  password: string;
}

export class UserService {
  async authenticate({ email, password }: AuthenticateParams) {
    const user = await prisma.employee.findUnique({ where: { email } });

    if (!user) {
      throw new Error('E-mail e/ou senha incorreto');
    }

    const doesPasswordMatch = await compare(password, user.password);

    if (!doesPasswordMatch) {
      throw new Error('E-mail e/ou senha incorreto');
    }

    const { expiresIn, secret } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return { user, token };
  }
}
