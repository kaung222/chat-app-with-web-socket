import { NestMiddleware, Injectable } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UserMiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.headers.authorization;

    if (!accessToken) {
      res.status(401).send({ message: 'You are not allowed!' }).end();
    }
    return next();
  }
}
