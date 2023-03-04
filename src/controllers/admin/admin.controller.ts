/* eslint-disable no-magic-numbers */
import { FastifyReply, FastifyRequest } from 'fastify';
import AdminRepository from '../../repository/admin.repository';

const api = new AdminRepository();

const DeleteImagesController = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const replyData = await api.deleteImages();

    reply.code(200).send(replyData);
  } catch (error) {
    throw new Error(error);
  }
};

export { DeleteImagesController };
