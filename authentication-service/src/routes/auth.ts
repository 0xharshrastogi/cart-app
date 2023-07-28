import { Router } from 'express';

import { Credential, IPasswordService, User } from '../common/types';
import { BcryptPassword as BcryptPasswordService } from '../helpers/BcryptPasswordHandler';
import { DebugLogger } from '../helpers/Logger';
import { UserCollection } from '../models/user';

export const router = Router();

const logger = DebugLogger.create('route::auth');
const password: IPasswordService = new BcryptPasswordService();

router.post('/auth/signup', async (request, response) => {
  const user = request.body as User;
  const { email } = user;

  try {
    const found = await UserCollection.exists({
      email: new RegExp(email, 'i'),
    }).exec();
    if (found) {
      const error = new Error('Email already Exist');
      response.status(400).json({ message: error.message, error });
      logger.log(error);
      return;
    }
    user.password = await password.hash(user.password);

    const document = new UserCollection(user);
    document.save();

    logger.log('user info saved successfully');
    response.status(200).json(document);
  } catch (error) {
    logger.log(error);
    response.status(500).json({
      message: 'failed to save user',
      error: error instanceof Error ? error.message : 'Something went wrong',
    });
  }
});

router.post('/auth/login', async (request, response) => {
  const credential = request.body as Credential;

  try {
    const user = await UserCollection.findOne({
      email: new RegExp(credential.email, 'i'),
    });
    console.log(await password.validate(credential.password, user!.password));
    const isValid =
      !user || (await password.validate(credential.password, user.password));

    if (!isValid) {
      const error = new Error(
        'Invalid Credential: Either email not exist or incorrect password'
      );
      response.status(401).json({ message: error.message });
      logger.log(error.message);
      return;
    }
    logger.log('user login successful');
    response.json({
      user: {
        firstName: user!.firstName,
        lastName: user!.lastName,
        email: user!.email,
      },
    });
  } catch (error) {
    logger.log(error);
    response.status(500).json({
      message: 'failed to login user',
      error: error instanceof Error ? error.message : 'Something went wrong',
    });
  }
});
