import { FastifyInstance } from 'fastify';

import { } from '../controllers/image/image.controller';

const imageRoutes = (fastify: FastifyInstance, opts: any, next: (err?: Error) => void) => {
  fastify.post('/add', AddImageController);

  fastify.patch('/update', UpdateImageController);

  fastify.delete('/delete', DeleteImageController);

  fastify.get('/image', GetImageController);

  fastify.get('/galery', GetGaleryController);

  next();
};

export default imageRoutes;
