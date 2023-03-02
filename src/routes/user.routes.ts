import { FastifyInstance } from 'fastify';

import { GetUserController, UpdateUserDataController, DeleteUserController } from '../controllers/user/user.controller';

const userRoutes = (fastify: FastifyInstance, opts: any, next: (err?: Error) => void) => {
  fastify.get('/user', GetUserController);

  fastify.get('/me', GetCurrentUserController);

  fastify.post('/user', UpdateUserDataController);

  fastify.delete('/user', DeleteUserController);

  next();
};

export default userRoutes;
