/* eslint-disable no-magic-numbers */
import { FastifyReply, FastifyRequest } from 'fastify';
import prisma from '../../prisma-client';
import { verifyToken } from '../../integrations/jwt';
import AdminRepository from '../../repository/admin.repository';

const api = new AdminRepository();

const notAuthorized = 'Not authorized';

const DeleteImagesController = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const user = verifyToken(req.headers.authorization);

    if (typeof user === 'string') {
      reply.code(500).send(notAuthorized);
    } else {
      const userData = await prisma.user.findUnique({
        where: {
          id: user.userId,
        },
      });

      if (userData.role === 'admin') {
        const replyData = await api.deleteImages();

        reply.code(200).send(replyData);
      }

      reply.code(500).send('Permission denied');
    }
  } catch (error) {
    throw new Error(error);
  }
};

export { DeleteImagesController };
