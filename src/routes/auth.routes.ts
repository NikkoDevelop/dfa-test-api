import { FastifyInstance } from 'fastify';

import { } from '../controllers/auth/auth.controller';

const userRoutes = (fastify: FastifyInstance, opts: any, next: (err?: Error) => void) => {
  fastify.post('/signup', RegisterUserController);

  fastify.post('/signin', LoginUserController);

  next();
};

export default userRoutes;
