import { NextFunction, Request, Response } from 'express';
import { IJsonWebTokenService } from '../common/types';

type ValidateJwtMiddlewareConfig = {
  jsonwebtoken: IJsonWebTokenService;
  parseToken: (request: Request) => string | undefined;
};

export const validateJwt = (config: ValidateJwtMiddlewareConfig) => {
  return (request: Request, response: Response, next: NextFunction) => {
    const token = config.parseToken(request);
    if (!token) {
      response.status(401).json({
        message:
          'Unauthorized Request: token not found in authorization header',
      });
      return;
    }
    try {
      const payload = config.jsonwebtoken.verify(token);
      response.locals['payload'] = payload;
      next();
    } catch (error) {
      response.status(401).json({
        message: 'Unauthorized Request: token verification failed',
      });
      return;
    }
  };
};
