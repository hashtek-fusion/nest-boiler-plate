import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Inject, Logger } from '@nestjs/common';
import { ENV_CONFIG_TOKEN } from '../../config/constants';
import { EnvProperties } from '../../config/env-properties.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly authService: AuthService, @Inject(ENV_CONFIG_TOKEN) config: EnvProperties) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            passReqToCallback: false,
            secretOrKey: config.jwtToken.secret,
            ignoreExpiration: false,
        },
        );
    }

    async validate(payload) {
        Logger.log('Inside jwt startegy verify menthod');
        const user = await this.authService.validateUser(payload);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}