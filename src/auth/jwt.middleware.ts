import {MiddlewareFunction, Middleware, NestMiddleware, Injectable, Logger} from '@nestjs/common';
import * as passport from 'passport';

@Injectable()
export class JWTMiddleware implements NestMiddleware {
  async resolve(): Promise<MiddlewareFunction> {
    return async (req, res, next) => {
      passport.authenticate('jwt', {session: false}, (err, user, info) => {
        Logger.log('inside JWT middleware info ----');
        Logger.log(info);
        Logger.log('inside JWT middleware error----');
        Logger.log(err);
        if (err) {
          return next(err);
        }
        if (user) {
          req.user = user;
        }
        return next();
      })(req, res, next);
    };
  }
}
