/* eslint-disable no-magic-numbers */
import { FastifyReply, FastifyRequest } from 'fastify';

import UserRepository from '../../repository/user.repository';
import { RegisterUserDTO, LoginUserDTO } from './auth.interfaces';

const api = new UserRepository();

const RegisterUserController = async (req: FastifyRequest<{Body: RegisterUserDTO}>, reply: FastifyReply) => {
  if (!req.body.email) {
    reply.code(500).send('Provide email please');
  }
  if (!req.body.password) {
    reply.code(500).send('Provide password please');
  }
  if (!req.body.login) {
    reply.code(500).send('Provide login please');
  }
  try {
    const replyData = await api.registerUser(req.body.email, req.body.password, req.body.login);

    reply.code(200).send(replyData);
  } catch (error) {
    throw new Error(error);
  }
};

const LoginUserController = async (req: FastifyRequest<{Body: LoginUserDTO}>, reply: FastifyReply) => {
  if (!req.body.email) {
    reply.code(500).send('Provide email please');
  }
  if (!req.body.password) {
    reply.code(500).send('Provide password please');
  }

  try {
    const replyData = await api.validateLogin(req.body.email, req.body.password);

    reply.code(200).send(replyData);
  } catch (error) {
    throw new Error(error);
  }
};

export { RegisterUserController, LoginUserController };
