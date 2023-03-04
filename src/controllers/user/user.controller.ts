/* eslint-disable no-magic-numbers */
import { FastifyReply, FastifyRequest } from 'fastify';

import UserRepository from '../../repository/user.repository';
import { DeleteUserDTO, GetUserDTO, UpdateUserDTO } from './user.interfaces';

const notAuthorized = 'Not authorized';

const api = new UserRepository();

const GetUserController = async (req: FastifyRequest<{Body: GetUserDTO}>, reply: FastifyReply) => {
  try {
    if (!req.body.email && !req.body.login) {
      reply.code(500).send('Send the user\'s email or login');
    }

    if (req.body.email && req.body.login) {
      reply.code(500).send('Send either email or user login');
    }

    const user = await api.getUser(req.body.email, req.body.login);

    reply.code(200).send(user);
  } catch (error) {
    throw new Error(error);
  }
};

const GetCurrentUserController = async (req: FastifyRequest, reply: FastifyReply) => {
  if (!req.headers.authorization) {
    reply.code(500).send(notAuthorized);
  }

  try {
    const user = await api.getCurrentUser(req.headers.authorization);

    reply.code(200).send(user);
  } catch (error) {
    throw new Error(error);
  }
};

const UpdateUserDataController = async (req: FastifyRequest<{Body: UpdateUserDTO}>, reply: FastifyReply) => {
  if (!req.headers.authorization) {
    reply.code(500).send(notAuthorized);
  }

  try {
    const updatedUser = await api.updateUserData(req.body);

    reply.code(200).send(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
};

const DeleteUserController = async (req: FastifyRequest<{Body: DeleteUserDTO}>, reply: FastifyReply) => {
  if (!req.headers.authorization) {
    reply.code(500).send(notAuthorized);
  }

  try {
    const deleteUserReply = await api.deleteUser(req.body.userId);

    reply.code(200).send(deleteUserReply);
  } catch (error) {
    throw new Error(error);
  }
};

export { GetUserController, GetCurrentUserController, UpdateUserDataController, DeleteUserController };
