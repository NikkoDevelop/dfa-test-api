import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

import { JWT_REFRESH_SECRET, JWT_SECRET } from '../../configs';

export const createToken = (user: User): string => {
  return jwt.sign({
    userId: user.id,
    iss: '',
  }, JWT_SECRET!, {
    algorithm: 'HS256',
    expiresIn: process.env.ENV_NAME === 'dev' ? '100h' : '200h',
  });
};

export const createRefreshToken = (user: User) => {
  return jwt.sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    JWT_REFRESH_SECRET!,
  );
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
