import { Router } from 'express';
import { IPasswordService, User } from '../common/types';
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
    const found = await UserCollection.exists({ email }).exec();
    if (found) {
      const error = new Error('Email already Exist');
      response.status(400).json({ message: error.message, error });
      logger.log(error);
      return;
    }
    user.password = await password.hash(user.password);

    const document = new UserCollection(user);
    document.save();

    response.status(200).json(document);
  } catch (error) {
    response.status(500).json({
      message: 'failed to save user',
      error,
    });
  }
});
