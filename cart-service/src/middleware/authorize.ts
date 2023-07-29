import { NextFunction, Request, Response } from 'express';

export const AuthorizeMiddleware = (
  verifyToken: (request: Request, token: string) => Promise<boolean>
) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const token = request.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      response
        .status(401)
        .json({ message: 'Unauthorized Request: token not found' });
      return;
    }
    const result = await verifyToken(request, token);

    if (!result) {
      response
        .status(401)
        .json({ message: 'Unauthorized Request: token verification failed' });
      return;
    }
    next();
  };
};
