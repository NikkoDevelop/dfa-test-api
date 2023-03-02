import { FastifyInstance } from 'fastify';

import { } from '../controllers/user.controller';

const userRoutes = (fastify: FastifyInstance, opts: any, next: (err?: Error) => void) => {
  fastify.delete('/images', DeleteImagesController);

  next();
};

export default userRoutes;
