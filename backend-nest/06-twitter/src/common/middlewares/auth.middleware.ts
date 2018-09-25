import * as jwt from 'jsonwebtoken';
import { Middleware, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { getRepository } from 'typeorm';
import { User } from '../../modules/users/user.entity';

export interface AuthMiddlewareRequest extends Request {
  user: any;
  token: string;
}
@Middleware()
export class AuthMiddleware implements NestMiddleware {
  public resolve(path: string[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
      if (path.indexOf(req.path) > -1) {
        return next();
      }
      if (!req.headers.authorization || (req.headers.authorization as string).split(' ')[0] !== 'Bearer') {
        throw new UnauthorizedException();
      }

      const token = (req.headers.authorization as string).split(' ')[1];
      let decoded: any;
      try {
        decoded = jwt.verify(token, process.env.JWT_KEY || 'Secret');
      } catch (e) {
        throw new UnauthorizedException();
      }
      const usersRepository = getRepository(User);
      const user = await usersRepository.findOne({
        id: decoded.id,
      });
      if (!user) {
        throw new UnauthorizedException();
      }
      req.user = user;
      next();
    };
  }
}
