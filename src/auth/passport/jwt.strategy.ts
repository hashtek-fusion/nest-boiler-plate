import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Inject, Logger } from '@nestjs/common';
import { ENV_CONFIG_TOKEN } from '../../config/constants';
import { EnvProperties } from '../../config/env-properties.model';

@Injectable()
export class JwtStrategy extends Strategy {
    constructor(private readonly authService: AuthService, @Inject(ENV_CONFIG_TOKEN) config: EnvProperties) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            passReqToCallback: true,
            secretOrKey: config.jwtToken.secret,
            ignoreExpiration: false,
        }, async (req, payload, done) => await this.verify(req, payload, done),
        );
        passport.use('jwt', this);
    }

    async verify(req, payload, done) {
        const isValid = await this.authService.validateUser(payload);
        if (!isValid) {
            return done('UnAuthorized', false);
        }
        done(null, payload);
    }
}