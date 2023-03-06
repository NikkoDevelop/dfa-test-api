import { FastifyInstance } from 'fastify';

import { CreateImageController, DeleteImageController, GetGaleryController, GetImageController, UpdateImageController, UploadImageController } from '../controllers/image/image.controller';

const imageRoutes = (fastify: FastifyInstance, opts: any, next: (err?: Error) => void) => {
  fastify.post('/upload', UploadImageController);

  fastify.post('/', CreateImageController);

  fastify.patch('/', UpdateImageController);

  fastify.delete('/', DeleteImageController);

  fastify.get('/:imageId', GetImageController);

  fastify.get('/:userId/galery', GetGaleryController);

  next();
};

export default imageRoutes;
