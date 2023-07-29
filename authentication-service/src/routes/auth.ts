import { Router } from 'express';

import { UserOutDTO } from '../DTO/UserOutDTO';
import {
  Credential,
  IJsonWebTokenService,
  IPasswordService,
  IRabbitMqHandler,
  User,
} from '../common/types';
import { APP_JWT_EXPIRATION_INTERVAL_SECOND, APP_JWT_SECRET } from '../config';
import { BcryptPassword as BcryptPasswordService } from '../helpers/BcryptPasswordHandler';
import { ApplicationJwtService } from '../helpers/JwtService';
import { DebugLogger } from '../helpers/Logger';
import { RabbitMqHandler } from '../messanger/setupRabbitMq';
import { validateJwt } from '../middleware/validateJwt';
import { UserCollection } from '../models/user';

export const router = Router();

const logger = DebugLogger.create('route::auth');
const password: IPasswordService = new BcryptPasswordService();
const jsonwebtoken: IJsonWebTokenService = new ApplicationJwtService({
  secret: APP_JWT_SECRET,
  expireInSecond: APP_JWT_EXPIRATION_INTERVAL_SECOND,
});
const rabbitMqMessenger: IRabbitMqHandler = new RabbitMqHandler(
  'amqp://localhost'
);

rabbitMqMessenger.consume<{ token: string }>('validate-jwt', ({ token }) => {
  logger.log('received request for verification of token');
  try {
    const payload = jsonwebtoken.verify(token);
    rabbitMqMessenger.publish('result-jwt-validation', {
      verified: true,
      payload: payload,
    });
    logger.log('token verified');
  } catch (error) {
    rabbitMqMessenger.publish('result-jwt-validation', {
      verified: false,
    });
    logger.log('token not verified');
  }
});

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

    await rabbitMqMessenger.consume('cart-created', (payload) => {
      logger.log('cart created for user', payload);
      response.status(200).json({
        user: new UserOutDTO(document),
        token: jsonwebtoken.encode({
          email: document.email,
          id: document.id,
        }),
      });
    });

    await rabbitMqMessenger.publish('create-cart', { userId: document.id });
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
      user: new UserOutDTO(user!),
      token: jsonwebtoken.encode({
        user: {
          email: user!.email,
          id: user!.id,
        },
      }),
    });
  } catch (error) {
    logger.log(error);
    response.status(500).json({
      message: 'failed to login user',
      error: error instanceof Error ? error.message : 'Something went wrong',
    });
  }
});

router.get(
  '/auth/validate',
  validateJwt({
    jsonwebtoken: jsonwebtoken,
    parseToken: (request) =>
      request.headers.authorization?.replace('Bearer ', ''),
  }),
  async (request, response) => {
    response.json({ payload: response.locals['payload'] });
  }
);
