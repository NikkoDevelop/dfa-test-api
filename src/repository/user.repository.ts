/* eslint-disable no-magic-numbers */
import bcrypt from 'bcrypt';
import prisma from '../prisma-client';

import { validatePassword } from '../utils';
import { createToken, verifyToken } from '../integrations/jwt/index';

class UserRepository {
  public async registerUser (email: string, password: string, login: string) {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email,
          },
          {
            login,
          },
        ],
      },
    });

    if (existingUser) {
      return 'User with provided email or login already exists';
    }

    const passValidationData = validatePassword(password);

    if (!passValidationData.digit) {
      return 'There is no numbers in provided password';
    }
    if (!passValidationData.lower) {
      return 'There is no lower case in provided password';
    }
    if (!passValidationData.upper) {
      return 'There is no upper case in provided password';
    }
    if (!passValidationData.lengthCheck) {
      return 'Password needs to be at least 8-length';
    }

    const hashedPassword = await bcrypt.hash(password, 7);

    const user = await prisma.user.create({
      data: {
        email,
        login,
        passwordHash: hashedPassword,
      },
    });

    const token = createToken(user);

    return { token, user };
  }

  public async validateLogin (email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return 'Incorrect email/password';
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatch) {
      return 'Incorrect email/password';
    }

    const token = createToken(user);

    return { token, user };
  }

  public async getUser (email: string, login: string) {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email,
          },
          {
            login,
          },
        ],
      },
    });

    if (!user) {
      return 'User is not finded';
    }

    return user;
  }

  public async getCurrentUser (token: string) {
    const user = verifyToken(token);

    if (typeof user === 'string') {
      return 'Not authorized';
    }
    return prisma.user.findUnique({
      where: {
        id: user.userId,
      },
    });
  }

  public async updateUserData (data: {
        userId: number,
        email?: string,
        password?: string,
        login?: string,
        role?: 'customer' | 'admin'
    },
  ) {
    const updatingUser = await prisma.user.findUnique({
      where: {
        id: data.userId,
      },
    });

    if (!updatingUser) {
      return 'User with privided id does not exist';
    }

    const hashedPassword = data.password ? await bcrypt.hash(data.password, 7) : null;

    return prisma.user.update({
      where: {
        id: data.userId,
      },
      data: {
        email: data.email || updatingUser.email,
        login: data.login || updatingUser.login,
        passwordHash: hashedPassword || updatingUser.passwordHash,
        role: data.role || updatingUser.role,
      },
    });
  }

  public async deleteUser (userId: number) {
    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      return 'User with privided id does not exist';
    }

    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return 'Deleted successfully';
  }
}

export default UserRepository;
