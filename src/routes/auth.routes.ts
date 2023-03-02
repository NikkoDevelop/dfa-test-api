import { FastifyInstance } from 'fastify';

import { LoginUserController, RegisterUserController } from '../controllers/auth/auth.controller';

const authRoutes = (fastify: FastifyInstance, opts: any, next: (err?: Error) => void) => {
  fastify.post('/signup', RegisterUserController);

  fastify.post('/signin', LoginUserController);

  next();
};

export default authRoutes;
