import fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyMultipart from '@fastify/multipart';
import type { FastifyCookieOptions } from '@fastify/cookie';
import cookie from '@fastify/cookie';
// import fastifySwagger from '@fastify/swagger';
// import fastifySwaggerUi from '@fastify/swagger-ui';

import { COOKIE_SECRET, SERVER_HOST, SERVER_PORT } from './configs';
import { logger } from './logs';
import imageRoutes from './routes/image.routes';
import adminRoutes from './routes/admin.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
// import { swaggerOptions, swaggerUiOptions } from './lib/swagger';

const server = fastify();

const restServer = async () => {
  try {
    const whitelist: string[] = [
      'http://localhost:3000',
      'http://localhost:3500',
      'http://localhost:4000',
    ];

    await server.register(cookie, {
      secret: COOKIE_SECRET,
      parseOptions: {},
    } as FastifyCookieOptions);

    await server.register(cors, {
      origin: (origin, callback) => {
        if (origin === undefined) {
          callback(null, false);
        } else if (whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(null, false);
        }
      },
    });

    await server.register(fastifyMultipart);

    // await server.register(fastifySwagger, swaggerOptions);
    // await server.register(fastifySwaggerUi, swaggerUiOptions);

    await server.register(authRoutes, {
      prefix: '/auth',
    });

    await server.register(userRoutes, {
      prefix: '/user',
    });

    await server.register(imageRoutes, {
      prefix: '/image',
    });

    await server.register(adminRoutes, {
      prefix: '/admin',
    });

    await server.ready().then(() => {
      logger.info('Fastify successfully booted!');
    }, (err) => {
      logger.error('an error happened', err);
    });
  } catch (error) {
    logger.error(JSON.stringify(error));

    throw new Error(`Unable to setup the server: ${JSON.stringify(error)}`);
  }

  try {
    await server.ready();
    // server.swagger();

    server.listen({
      port: Number(SERVER_PORT),
      host: SERVER_HOST,
    }, (err) => {
      if (err) {
        logger.error(err?.stack);
      }
      logger.info(`Server started at http://${SERVER_HOST}:${SERVER_PORT}`);
    });
  } catch (error) {
    logger.error(`Unable to start the server: ${error?.stack}`);

    throw new Error(error as string);
  }
};

export {
  restServer,
};
