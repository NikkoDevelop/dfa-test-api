import { FastifyInstance } from 'fastify';
import { DeleteUserController, GetCurrentUserController, GetUserController, UpdateUserDataController } from '../controllers/user/user.controller';

const userRoutes = (fastify: FastifyInstance, opts: any, next: (err?: Error) => void) => {
  fastify.post('/', GetUserController);

  fastify.get('/me', GetCurrentUserController);

  fastify.patch('/', UpdateUserDataController);

  fastify.delete('/', DeleteUserController);

  next();
};

export default userRoutes;
