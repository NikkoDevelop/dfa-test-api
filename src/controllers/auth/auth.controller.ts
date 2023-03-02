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

// const GetUserController = async (req: FastifyRequest<{Headers: { token: string}}>, reply: FastifyReply) => {
//   if (!req.headers.token) {
//     reply.code(500).send('Not authorized');
//   }

//   try {
//     const user = await api.getUser(req.headers.token);

//     reply.code(200).send(user);
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// const UpdateUserDataController = async (req: FastifyRequest<{Headers: { token: string}, Body: UpdateUserTypes}>, reply: FastifyReply) => {
//   if (!req.headers.token) {
//     reply.code(500).send('Not authorized');
//   }

//   try {
//     const updatedUser = await api.updateUserData(req.headers.token, req.body.email, req.body.password, req.body.nickName);

//     reply.code(200).send(updatedUser);
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// const DeleteUserHandler = async (req: FastifyRequest<{Headers: { token: string}}>, reply: FastifyReply) => {
//   if (!req.headers.token) {
//     reply.code(500).send('Not authorized');
//   }

//   try {
//     const deleteUserReply = await api.deleteUser(req.headers.token);

//     reply.code(200).send(deleteUserReply);
//   } catch (error) {
//     throw new Error(error);
//   }
// };

export { RegisterUserController, LoginUserController };
