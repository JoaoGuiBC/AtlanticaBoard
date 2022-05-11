import { verify } from 'jsonwebtoken';
import { AuthChecker } from 'type-graphql';

import authConfig from '../../config/auth';

type ContextType = {
  token: string;
};

export const authChecker: AuthChecker<ContextType> = ({ context }) => {
  const { token } = context;

  if (!token) {
    throw new Error('Token de autenticação ausente');
  }

  try {
    verify(token, authConfig.jwt.secret);
  } catch (_) {
    throw new Error('Autenticação inválida, por favor refaça login');
  }

  return true;
};
