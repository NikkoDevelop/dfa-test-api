/* eslint-disable no-magic-numbers */
import fs from 'fs';
import { FastifyReply, FastifyRequest } from 'fastify';
import path from 'path';
import util from 'util';
import { pipeline } from 'stream';

import { verifyToken } from '../../integrations/jwt';
import { logger } from '../../logs';
import * as awsS3API from '../../integrations/aws/s3';
import ImageRepository from '../../repository/image.repository';
import { CreateImageDTO, DeleteImageDTO, GetGaleryDTO, GetImageDTO, UpdateImageDTO } from './image.interface';

const notAuthorized = 'Not authorized';

const api = new ImageRepository();

const pump = util.promisify(pipeline);

export const UploadImageController = async (req: FastifyRequest, reply: FastifyReply) => {
  const part = await req.file();

  const filepath = path.join('temp', part.filename);

  await pump(part.file, fs.createWriteStream(filepath));

  const fileUrl = await awsS3API.uploadFile(filepath, part.filename);

  await fs.rm(filepath, async (err) => {
    if (err) {
      logger.error(err.message);
      return;
    }
    logger.info('File deleted successfully');
  });

  reply.status(200).send(fileUrl);
};

export const CreateImageController = async (req: FastifyRequest<{ Body: CreateImageDTO }>, reply: FastifyReply) => {
  try {
    if (!req.headers.authorization) {
      reply.code(500).send(notAuthorized);
    }

    const user = verifyToken(req.headers.authorization);

    if (typeof user === 'string') {
      reply.code(500).send(notAuthorized);
    } else {
      const newImage = await api.createImage(user.userId, req.body.title, req.body.url, req.body.shortDescription);

      reply.status(200).send(newImage);
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const UpdateImageController = async (req: FastifyRequest<{ Body: UpdateImageDTO }>, reply: FastifyReply) => {
  try {
    if (!req.headers.authorization) {
      reply.code(500).send(notAuthorized);
    }

    const user = verifyToken(req.headers.authorization);

    if (typeof user === 'string') {
      reply.code(500).send(notAuthorized);
    } else {
      const updatedImage = await api.updateImage(user.userId, req.body.imageId, req.body.title, req.body.url, req.body.shortDescription);

      reply.status(200).send(updatedImage);
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const DeleteImageController = async (req: FastifyRequest<{ Body: DeleteImageDTO }>, reply: FastifyReply) => {
  try {
    const deleteImageReply = await api.deleteImage(req.body.imageId);

    reply.status(200).send(deleteImageReply);
  } catch (error) {
    throw new Error(error);
  }
};

export const GetImageController = async (req: FastifyRequest<{ Params: GetImageDTO }>, reply: FastifyReply) => {
  try {
    const image = await api.getImage(Number(req.params.imageId));

    reply.status(200).send(image);
  } catch (error) {
    throw new Error(error);
  }
};

export const GetGaleryController = async (req: FastifyRequest<{ Params: GetGaleryDTO }>, reply: FastifyReply) => {
  try {
    const galery = await api.getGalery(Number(req.params.userId));

    reply.status(200).send(galery);
  } catch (error) {
    throw new Error(error);
  }
};
