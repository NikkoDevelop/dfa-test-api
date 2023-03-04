import { FastifyInstance } from 'fastify';
import { DeleteImagesController } from '../controllers/admin/admin.controller';

const adminRoutes = (fastify: FastifyInstance, opts: any, next: (err?: Error) => void) => {
  fastify.delete('/', DeleteImagesController);

  next();
};

export default adminRoutes;
